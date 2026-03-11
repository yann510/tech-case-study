import { Router, Request, Response } from "express";
import {
  CampaignService,
  CampaignNotFoundError,
  CampaignAlreadySentError,
} from "../services/campaignService";
import { ValidationPipeline } from "../validators/campaignPipeline";

const router = Router();
const campaignService = new CampaignService();

const createCampaignValidator = new ValidationPipeline<{
  subject: string;
  body: string;
  recipientIds: number[];
}>()
  .required("subject")
  .minLength("subject", 1)
  .required("body")
  .minLength("body", 1)
  .isArray("recipientIds");

router.get("/", (_req: Request, res: Response) => {
  try {
    const campaigns = campaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    mapServiceError(error, res);
  }
});

router.get("/:id", (req: Request, res: Response) => {
  try {
    const campaign = campaignService.getCampaignById(Number(req.params.id));
    res.json(campaign);
  } catch (error) {
    mapServiceError(error, res);
  }
});

router.post("/", (req: Request, res: Response) => {
  const validation = createCampaignValidator.validate(req.body);
  if (!validation.valid) {
    res
      .status(400)
      .json({ error: "Validation failed", details: validation.errors });
    return;
  }

  try {
    const campaign = campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    mapServiceError(error, res);
  }
});

router.post("/:id/send", (req: Request, res: Response) => {
  try {
    const campaign = campaignService.sendCampaign(Number(req.params.id));
    res.json(campaign);
  } catch (error) {
    mapServiceError(error, res);
  }
});

function mapServiceError(error: unknown, res: Response) {
  if (error instanceof CampaignNotFoundError) {
    res.status(404).json({ error: error.message });
    return;
  }
  if (error instanceof CampaignAlreadySentError) {
    res.status(409).json({ error: error.message });
    return;
  }
  console.error("Campaign error:", error);
  res.status(500).json({ error: "Internal server error" });
}

export default router;
