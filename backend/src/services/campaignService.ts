import { CampaignRepository } from "../repositories/campaignRepository";

export class CampaignNotFoundError extends Error {
  constructor(id: number) {
    super(`Campaign with id ${id} not found`);
    this.name = "CampaignNotFoundError";
  }
}

export class CampaignAlreadySentError extends Error {
  constructor() {
    super("Campaign has already been sent");
    this.name = "CampaignAlreadySentError";
  }
}

export class CampaignService {
  private repository: CampaignRepository;

  constructor() {
    this.repository = new CampaignRepository();
  }

  getAllCampaigns() {
    return this.repository.findAll();
  }

  getCampaignById(id: number) {
    const campaign = this.repository.findById(id);
    if (!campaign) {
      throw new CampaignNotFoundError(id);
    }

    const recipients = this.repository.findRecipientsForCampaign(id);
    return { ...campaign, recipients };
  }

  createCampaign(data: {
    subject: string;
    body: string;
    recipientIds?: number[];
  }) {
    const campaign = this.repository.create({
      subject: data.subject,
      body: data.body,
    });

    if (data.recipientIds && data.recipientIds.length > 0) {
      this.repository.addRecipients(campaign.id, data.recipientIds);
    }

    return this.getCampaignById(campaign.id);
  }

  sendCampaign(id: number) {
    const campaign = this.repository.findById(id);
    if (!campaign) {
      throw new CampaignNotFoundError(id);
    }
    if (campaign.status === "sent") {
      throw new CampaignAlreadySentError();
    }

    this.repository.updateStatus(id, "sent");
    return this.getCampaignById(id);
  }
}
