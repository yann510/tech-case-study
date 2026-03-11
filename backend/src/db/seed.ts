import type Database from "better-sqlite3";

export function seedDatabase(db: Database.Database) {
  const contacts = [
    { first_name: "Alice", last_name: "Martin", email: "alice.martin@email.com", phone: "514-555-0101" },
    { first_name: "Bob", last_name: "Thompson", email: "bob.thompson@email.com", phone: "514-555-0102" },
    { first_name: "Clara", last_name: "Dubois", email: "clara.dubois@email.com", phone: "438-555-0103" },
    { first_name: "David", last_name: "Chen", email: "david.chen@email.com", phone: "514-555-0104" },
    { first_name: "Emma", last_name: "Wilson", email: "emma.wilson@email.com", phone: null },
    { first_name: "François", last_name: "Tremblay", email: "francois.tremblay@email.com", phone: "438-555-0106" },
    { first_name: "Grace", last_name: "Kim", email: "grace.kim@email.com", phone: "514-555-0107" },
    { first_name: "Hugo", last_name: "Bernard", email: "hugo.bernard@email.com", phone: null },
    { first_name: "Isabelle", last_name: "Roy", email: "isabelle.roy@email.com", phone: "438-555-0109" },
    { first_name: "James", last_name: "Patel", email: "james.patel@email.com", phone: "514-555-0110" },
    { first_name: "Karen", last_name: "Nguyen", email: "karen.nguyen@email.com", phone: "438-555-0111" },
    { first_name: "Luc", last_name: "Gagnon", email: "luc.gagnon@email.com", phone: null },
    { first_name: "Marie", last_name: "Lavoie", email: "marie.lavoie@email.com", phone: "514-555-0113" },
    { first_name: "Nathan", last_name: "Brown", email: "nathan.brown@email.com", phone: "438-555-0114" },
    { first_name: "Olivia", last_name: "Taylor", email: "olivia.taylor@email.com", phone: "514-555-0115" },
    { first_name: "Philippe", last_name: "Côté", email: "philippe.cote@email.com", phone: null },
    { first_name: "Rachel", last_name: "Singh", email: "rachel.singh@email.com", phone: "438-555-0117" },
    { first_name: "Samuel", last_name: "Bouchard", email: "samuel.bouchard@email.com", phone: "514-555-0118" },
    { first_name: "Tanya", last_name: "Okafor", email: "tanya.okafor@email.com", phone: "438-555-0119" },
    { first_name: "Victor", last_name: "Leblanc", email: "victor.leblanc@email.com", phone: "514-555-0120" },
  ];

  const insertContact = db.prepare(
    "INSERT INTO contacts (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)"
  );
  for (const c of contacts) {
    insertContact.run(c.first_name, c.last_name, c.email, c.phone);
  }

  const forms = [
    { title: "Annual Gala 2024", description: "Support our annual fundraising gala benefiting local youth programs.", goal_amount: 5000000, is_active: 1 },
    { title: "Emergency Relief Fund", description: "Help families affected by recent natural disasters in our community.", goal_amount: 2500000, is_active: 1 },
    { title: "Youth Education Program", description: "Fund scholarships and after-school tutoring for underprivileged students.", goal_amount: 1000000, is_active: 1 },
    { title: "Community Garden Project", description: "Build and maintain community gardens in food desert neighborhoods.", goal_amount: 500000, is_active: 1 },
    { title: "Holiday Gift Drive 2023", description: "Last year's holiday gift collection for children in shelters.", goal_amount: 1500000, is_active: 0 },
  ];

  const insertForm = db.prepare(
    "INSERT INTO forms (title, description, goal_amount, is_active) VALUES (?, ?, ?, ?)"
  );
  for (const f of forms) {
    insertForm.run(f.title, f.description, f.goal_amount, f.is_active);
  }

  const donations = [
    { form_id: 1, contact_id: 1, amount: 25000, created_at: "2024-01-15 10:30:00" },
    { form_id: 1, contact_id: 2, amount: 50000, created_at: "2024-01-16 14:22:00" },
    { form_id: 1, contact_id: 3, amount: 10000, created_at: "2024-01-18 09:15:00" },
    { form_id: 1, contact_id: 5, amount: 100000, created_at: "2024-02-01 11:00:00" },
    { form_id: 1, contact_id: 7, amount: 75000, created_at: "2024-02-14 16:45:00" },
    { form_id: 1, contact_id: 10, amount: 15000, created_at: "2024-02-20 08:30:00" },
    { form_id: 1, contact_id: 12, amount: 200000, created_at: "2024-03-01 13:00:00" },
    { form_id: 1, contact_id: 14, amount: 35000, created_at: "2024-03-10 10:20:00" },
    { form_id: 1, contact_id: 16, amount: 50000, created_at: "2024-03-15 15:30:00" },
    { form_id: 1, contact_id: 18, amount: 45000, created_at: "2024-03-22 09:45:00" },
    { form_id: 2, contact_id: 1, amount: 100000, created_at: "2024-04-01 08:00:00" },
    { form_id: 2, contact_id: 3, amount: 50000, created_at: "2024-04-02 11:30:00" },
    { form_id: 2, contact_id: 4, amount: 75000, created_at: "2024-04-03 14:15:00" },
    { form_id: 2, contact_id: 6, amount: 25000, created_at: "2024-04-05 16:00:00" },
    { form_id: 2, contact_id: 8, amount: 150000, created_at: "2024-04-08 10:45:00" },
    { form_id: 2, contact_id: 9, amount: 30000, created_at: "2024-04-10 09:00:00" },
    { form_id: 2, contact_id: 11, amount: 60000, created_at: "2024-04-12 12:30:00" },
    { form_id: 2, contact_id: 13, amount: 40000, created_at: "2024-04-15 14:00:00" },
    { form_id: 2, contact_id: 15, amount: 80000, created_at: "2024-04-18 11:15:00" },
    { form_id: 2, contact_id: 17, amount: 20000, created_at: "2024-04-20 08:45:00" },
    { form_id: 3, contact_id: 2, amount: 50000, created_at: "2024-05-01 10:00:00" },
    { form_id: 3, contact_id: 4, amount: 25000, created_at: "2024-05-05 13:30:00" },
    { form_id: 3, contact_id: 6, amount: 100000, created_at: "2024-05-10 09:45:00" },
    { form_id: 3, contact_id: 8, amount: 35000, created_at: "2024-05-15 16:00:00" },
    { form_id: 3, contact_id: 10, amount: 75000, created_at: "2024-05-20 11:30:00" },
    { form_id: 3, contact_id: 12, amount: 20000, created_at: "2024-05-25 08:15:00" },
    { form_id: 3, contact_id: 14, amount: 45000, created_at: "2024-06-01 14:45:00" },
    { form_id: 3, contact_id: 19, amount: 60000, created_at: "2024-06-05 10:00:00" },
    { form_id: 4, contact_id: 1, amount: 15000, created_at: "2024-06-10 09:30:00" },
    { form_id: 4, contact_id: 5, amount: 30000, created_at: "2024-06-15 12:00:00" },
    { form_id: 4, contact_id: 7, amount: 50000, created_at: "2024-06-20 15:15:00" },
    { form_id: 4, contact_id: 9, amount: 10000, created_at: "2024-06-25 08:45:00" },
    { form_id: 4, contact_id: 11, amount: 25000, created_at: "2024-07-01 11:00:00" },
    { form_id: 4, contact_id: 20, amount: 40000, created_at: "2024-07-05 14:30:00" },
    { form_id: 5, contact_id: 2, amount: 50000, created_at: "2023-12-01 10:00:00" },
    { form_id: 5, contact_id: 3, amount: 30000, created_at: "2023-12-05 13:45:00" },
    { form_id: 5, contact_id: 6, amount: 75000, created_at: "2023-12-10 09:30:00" },
    { form_id: 5, contact_id: 8, amount: 25000, created_at: "2023-12-15 16:00:00" },
    { form_id: 5, contact_id: 10, amount: 100000, created_at: "2023-12-18 11:15:00" },
    { form_id: 5, contact_id: 13, amount: 45000, created_at: "2023-12-20 08:00:00" },
    { form_id: 5, contact_id: 15, amount: 20000, created_at: "2023-12-22 14:30:00" },
    { form_id: 5, contact_id: 17, amount: 60000, created_at: "2023-12-23 10:45:00" },
    { form_id: 5, contact_id: 19, amount: 35000, created_at: "2023-12-24 09:00:00" },
    { form_id: 1, contact_id: 4, amount: 30000, created_at: "2024-04-01 10:00:00" },
    { form_id: 1, contact_id: 9, amount: 55000, created_at: "2024-04-15 11:30:00" },
    { form_id: 2, contact_id: 19, amount: 45000, created_at: "2024-04-22 09:15:00" },
    { form_id: 2, contact_id: 20, amount: 35000, created_at: "2024-04-25 14:00:00" },
    { form_id: 3, contact_id: 16, amount: 80000, created_at: "2024-06-10 16:30:00" },
    { form_id: 4, contact_id: 13, amount: 20000, created_at: "2024-07-10 08:00:00" },
    { form_id: 4, contact_id: 17, amount: 35000, created_at: "2024-07-15 12:45:00" },
  ];

  const insertDonation = db.prepare(
    "INSERT INTO donations (form_id, contact_id, amount, created_at) VALUES (?, ?, ?, ?)"
  );
  for (const d of donations) {
    insertDonation.run(d.form_id, d.contact_id, d.amount, d.created_at);
  }

  const campaigns = [
    {
      subject: "Thank You for Supporting Our Annual Gala!",
      body: "Dear supporter,\n\nThank you for your generous contribution to our Annual Gala 2024. Your donation makes a real difference in the lives of young people in our community.\n\nWith gratitude,\nThe Team",
      status: "sent",
      sent_at: "2024-03-25 09:00:00",
    },
    {
      subject: "Year-End Appeal: Double Your Impact",
      body: "Dear friend,\n\nAs we approach the end of the year, we invite you to consider making a tax-deductible donation. Thanks to a matching grant, every dollar you give will be doubled!\n\nBest regards,\nThe Fundraising Team",
      status: "sent",
      sent_at: "2024-11-15 10:00:00",
    },
    {
      subject: "Spring Newsletter: What We've Accomplished Together",
      body: "Dear community member,\n\nWe're excited to share our spring update with you. Thanks to your support, we've been able to expand our Youth Education Program and break ground on two new community gardens.\n\nRead on for the full update...",
      status: "draft",
      sent_at: null,
    },
  ];

  const insertCampaign = db.prepare(
    "INSERT INTO campaigns (subject, body, status, sent_at) VALUES (?, ?, ?, ?)"
  );
  for (const c of campaigns) {
    insertCampaign.run(c.subject, c.body, c.status, c.sent_at);
  }

  const campaignRecipients = [
    { campaign_id: 1, contact_id: 1 },
    { campaign_id: 1, contact_id: 2 },
    { campaign_id: 1, contact_id: 3 },
    { campaign_id: 1, contact_id: 5 },
    { campaign_id: 1, contact_id: 7 },
    { campaign_id: 1, contact_id: 10 },
    { campaign_id: 1, contact_id: 12 },
    { campaign_id: 1, contact_id: 14 },
    { campaign_id: 1, contact_id: 16 },
    { campaign_id: 1, contact_id: 18 },
    { campaign_id: 2, contact_id: 1 },
    { campaign_id: 2, contact_id: 2 },
    { campaign_id: 2, contact_id: 3 },
    { campaign_id: 2, contact_id: 4 },
    { campaign_id: 2, contact_id: 5 },
    { campaign_id: 2, contact_id: 6 },
    { campaign_id: 2, contact_id: 7 },
    { campaign_id: 2, contact_id: 8 },
    { campaign_id: 2, contact_id: 9 },
    { campaign_id: 2, contact_id: 10 },
    { campaign_id: 3, contact_id: 11 },
    { campaign_id: 3, contact_id: 12 },
    { campaign_id: 3, contact_id: 13 },
    { campaign_id: 3, contact_id: 14 },
    { campaign_id: 3, contact_id: 15 },
  ];

  const insertRecipient = db.prepare(
    "INSERT INTO campaign_recipients (campaign_id, contact_id) VALUES (?, ?)"
  );
  for (const r of campaignRecipients) {
    insertRecipient.run(r.campaign_id, r.contact_id);
  }
}
