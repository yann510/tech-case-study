import { Router, Request, Response } from "express";
import knexDb from "../db/knex";
import {
  createContactSchema,
  updateContactSchema,
  validate,
} from "../validators/contacts";

const router = Router();

function handleError(error: unknown, res: Response) {
  console.error("Contacts error:", error);
  res.status(500).json({ error: "Internal server error" });
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const contacts = await knexDb("contacts")
      .select(
        "contacts.*",
        knexDb.raw("COALESCE(SUM(donations.amount), 0) as total_donated"),
        knexDb.raw("COUNT(donations.id) as donation_count")
      )
      .leftJoin("donations", "contacts.id", "donations.contact_id")
      .groupBy("contacts.id")
      .orderBy("contacts.created_at", "desc");

    res.json(contacts);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const contact = await knexDb("contacts")
      .where("contacts.id", req.params.id)
      .first();

    if (!contact) {
      res.status(404).json({ error: "Contact not found" });
      return;
    }

    const donations = await knexDb("donations")
      .select("donations.*", "forms.title as form_title")
      .join("forms", "forms.id", "donations.form_id")
      .where("donations.contact_id", req.params.id)
      .orderBy("donations.created_at", "desc");

    res.json({ ...contact, donations });
  } catch (error) {
    handleError(error, res);
  }
});

router.post(
  "/",
  validate(createContactSchema),
  async (req: Request, res: Response) => {
    try {
      const [id] = await knexDb("contacts").insert(req.body);
      const contact = await knexDb("contacts").where("id", id).first();
      res.status(201).json(contact);
    } catch (error: any) {
      if (
        error.message &&
        error.message.includes("UNIQUE constraint failed")
      ) {
        res
          .status(409)
          .json({ error: "A contact with this email already exists" });
        return;
      }
      handleError(error, res);
    }
  }
);

router.put(
  "/:id",
  validate(updateContactSchema),
  async (req: Request, res: Response) => {
    try {
      const existing = await knexDb("contacts")
        .where("id", req.params.id)
        .first();

      if (!existing) {
        res.status(404).json({ error: "Contact not found" });
        return;
      }

      await knexDb("contacts").where("id", req.params.id).update(req.body);
      const contact = await knexDb("contacts")
        .where("id", req.params.id)
        .first();
      res.json(contact);
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
