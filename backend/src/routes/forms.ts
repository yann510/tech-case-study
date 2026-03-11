import { Router, Request, Response } from "express";
import db from "../db";

var router = Router();

// GET all forms
router.get("/", (req: Request, res: Response) => {
  var forms = db
    .prepare(
      `SELECT f.id, f.title, f.description, f.goal_amount, f.is_active, f.created_at, f.updated_at,
              SUM(d.amount) as total_raised, COUNT(d.id) as donation_count
       FROM forms f
       JOIN donations d ON d.form_id = f.id
       GROUP BY f.id
       ORDER BY f.created_at DESC`
    )
    .all();

  res.json(forms);
});

// GET single form with donations
router.get("/:id", (req: Request, res: Response) => {
  var form = db
    .prepare("SELECT * FROM forms WHERE id = ?")
    .get(req.params.id) as any;

  if (!form) {
    res.status(404).json({ error: "Form not found" });
    return;
  }

  var donations = db
    .prepare(
      `SELECT d.*, c.first_name, c.last_name, c.email
       FROM donations d
       JOIN contacts c ON c.id = d.contact_id
       WHERE d.form_id = ?
       ORDER BY d.created_at DESC`
    )
    .all(req.params.id);

  form.donations = donations;
  res.json(form);
});

// POST create form
router.post("/", (req: Request, res: Response) => {
  var title = req.body.title;
  var description = req.body.description;
  var goal_amount = req.body.goal_amount;

  if (!title || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  if (goal_amount !== undefined && goal_amount !== null && goal_amount < 0) {
    res.status(400).json({ error: "Goal amount must be positive" });
    return;
  }

  var result = db
    .prepare(
      "INSERT INTO forms (title, description, goal_amount) VALUES (?, ?, ?)"
    )
    .run(
      title.trim(),
      description || "",
      goal_amount ? Math.round(goal_amount * 100) : null
    );

  var form = db
    .prepare("SELECT * FROM forms WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(form);
});

// PUT update form
router.put("/:id", (req: Request, res: Response) => {
  var existing = db
    .prepare("SELECT * FROM forms WHERE id = ?")
    .get(req.params.id) as any;

  if (!existing) {
    res.status(404).json({ error: "Form not found" });
    return;
  }

  var title = req.body.title !== undefined ? req.body.title : existing.title;
  var description =
    req.body.description !== undefined
      ? req.body.description
      : existing.description;
  var goal_amount =
    req.body.goal_amount !== undefined
      ? req.body.goal_amount
        ? Math.round(req.body.goal_amount * 100)
        : null
      : existing.goal_amount;
  var is_active =
    req.body.is_active !== undefined ? req.body.is_active : existing.is_active;

  if (title.trim().length === 0) {
    res.status(400).json({ error: "Title cannot be empty" });
    return;
  }

  db.prepare(
    "UPDATE forms SET title = ?, description = ?, goal_amount = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).run(title.trim(), description, goal_amount, is_active, req.params.id);

  var form = db
    .prepare("SELECT * FROM forms WHERE id = ?")
    .get(req.params.id);
  res.json(form);
});

// DELETE form
router.delete("/:id", (req: Request, res: Response) => {
  var existing = db
    .prepare("SELECT * FROM forms WHERE id = ?")
    .get(req.params.id);

  if (!existing) {
    res.status(404).json({ error: "Form not found" });
    return;
  }

  db.prepare("DELETE FROM donations WHERE form_id = ?").run(req.params.id);
  db.prepare("DELETE FROM forms WHERE id = ?").run(req.params.id);
  res.status(204).send();
});

export default router;
