import { Router, Request, Response } from "express";
import db from "../db";

var router = Router();

router.get("/summary", (req: Request, res: Response) => {
  var aggregates = db
    .prepare(
      `SELECT
         COALESCE(SUM(amount), 0) as total_raised,
         COUNT(DISTINCT contact_id) as unique_donors
       FROM donations`
    )
    .get() as { total_raised: number; unique_donors: number };

  var recentDonations = db
    .prepare(
      `SELECT d.id, d.form_id, d.contact_id, d.amount, d.created_at,
              c.first_name, c.last_name, c.email,
              f.title as form_title
       FROM donations d
       JOIN contacts c ON c.id = d.contact_id
       JOIN forms f ON f.id = d.form_id
       ORDER BY d.created_at DESC
       LIMIT 5`
    )
    .all();

  res.json({
    total_raised: aggregates.total_raised,
    unique_donors: aggregates.unique_donors,
    recent_donations: recentDonations,
  });
});

export default router;
