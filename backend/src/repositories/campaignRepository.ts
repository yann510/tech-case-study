import db from "../db";

interface CampaignRow {
  id: number;
  subject: string;
  body: string;
  status: string;
  sent_at: string | null;
  created_at: string;
}

interface RecipientRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
}

export class CampaignRepository {
  findAll(): (CampaignRow & { recipient_count: number })[] {
    return db
      .prepare(
        `SELECT c.*, COUNT(cr.id) as recipient_count
         FROM campaigns c
         LEFT JOIN campaign_recipients cr ON cr.campaign_id = c.id
         GROUP BY c.id
         ORDER BY c.created_at DESC`
      )
      .all() as (CampaignRow & { recipient_count: number })[];
  }

  findById(id: number): CampaignRow | undefined {
    return db
      .prepare("SELECT * FROM campaigns WHERE id = ?")
      .get(id) as CampaignRow | undefined;
  }

  findRecipientsForCampaign(campaignId: number): RecipientRow[] {
    return db
      .prepare(
        `SELECT c.id, c.first_name, c.last_name, c.email, c.phone
         FROM contacts c
         INNER JOIN campaign_recipients cr ON cr.contact_id = c.id
         WHERE cr.campaign_id = ?`
      )
      .all(campaignId) as RecipientRow[];
  }

  create(data: { subject: string; body: string }): CampaignRow {
    const result = db
      .prepare("INSERT INTO campaigns (subject, body) VALUES (?, ?)")
      .run(data.subject, data.body);

    return this.findById(Number(result.lastInsertRowid))!;
  }

  addRecipients(campaignId: number, contactIds: number[]): void {
    const insert = db.prepare(
      "INSERT INTO campaign_recipients (campaign_id, contact_id) VALUES (?, ?)"
    );

    const insertMany = db.transaction((ids: number[]) => {
      for (const contactId of ids) {
        insert.run(campaignId, contactId);
      }
    });

    insertMany(contactIds);
  }

  updateStatus(id: number, status: string): void {
    if (status === "sent") {
      db.prepare(
        "UPDATE campaigns SET status = ?, sent_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(status, id);
    } else {
      db.prepare("UPDATE campaigns SET status = ? WHERE id = ?").run(
        status,
        id
      );
    }
  }
}
