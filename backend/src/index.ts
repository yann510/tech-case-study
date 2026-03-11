import express from "express";
import cors from "cors";
import { initializeDatabase } from "./db";
import formsRouter from "./routes/forms";
import contactsRouter from "./routes/contacts";
import campaignsRouter from "./routes/campaigns";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.use("/api/forms", formsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/campaigns", campaignsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
