# Fundraising Platform — Engineering Case Study

A simplified NGO fundraising platform where organizations can manage donation forms, contacts, and email campaigns. Built with Next.js and Express.

## For Interviewers

This repo is a **GitHub template**. To send a case study:

1. **Public template** — Send candidates the repo link and ask them to click **"Use this template"** to create their own copy.
2. **Private template** — Download a zip and email it to the candidate:
   ```bash
   gh api repos/your-org/tech-case-study/zipball -H "Accept: application/vnd.github+json" > case-study.zip
   ```

Candidates do the work in their own repo (or local copy) and share the link or zip back when done.

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Clone and install
git clone <repo-url>
cd tech-case-study
npm install

# 2. Start the app (backend + frontend)
npm run dev
```

The app will be available at **http://localhost:3000** (frontend) and **http://localhost:3001** (backend API). The database is automatically created and seeded on first run.

## The Application

The platform has three features:

- **Donation Forms** — Create and manage fundraising forms. Each form has a title, description, goal amount, and tracks donations received.
- **Contacts** — View and manage donors. Each contact shows their donation history and total contributions.
- **Email Campaigns** — Create email campaigns and select recipients from the contacts list. Campaigns can be drafted and then sent.

Take some time to explore the codebase and understand how each feature is built before starting the tasks below.

## Your Tasks

Complete the following three tasks. Use a **separate branch for each task** so changes are easy to review independently.

Use any tools you'd like, including AI assistants, documentation, or libraries.

---

### Task 1 — Bug Fix

**Bug: "My form disappeared!"**

A user reports: *"I created a new donation form but when I got back to the list, it wasn't there"*

Investigate and fix the issue. Include a brief explanation of the root cause in your PR description.

---

### Task 2 — Feature Improvement

**Improvement: Contacts are hard to find**

The Contacts page currently displays all contacts in a single unsorted list. As the number of contacts grows, users need a way to quickly find who they're looking for.

Add the ability to **search** contacts by name or email, and **sort** the list by name or by total donation amount. The search should update results as the user types (with reasonable debouncing).

---

### Task 3 — New Feature

**Feature: Organization Dashboard**

Organizations have asked for a simple overview page that gives them a quick snapshot of their fundraising activity. Build a new **Dashboard** page accessible from the navigation.

It should display:
- Total amount raised across all forms
- Number of unique donors
- The 5 most recent donations (showing donor name, form name, amount, and date)

You are free to design the UI and choose the technical approach.

---

## Guidelines

- Write code as you would for a real production codebase.
- Use a **separate branch** for each task (e.g. `task-1-bug-fix`, `task-2-contacts-search`, `task-3-dashboard`).
- Push your branches when you're done. Brief commit messages explaining your reasoning and trade-offs are appreciated.

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend  | Express.js, TypeScript      |
| Database | SQLite (via better-sqlite3) |
