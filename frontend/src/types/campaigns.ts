export enum CampaignStatus {
  DRAFT = "draft",
  SENT = "sent",
}

export namespace CampaignUtils {
  export function formatStatus(status: CampaignStatus): string {
    switch (status) {
      case CampaignStatus.DRAFT:
        return "Draft";
      case CampaignStatus.SENT:
        return "Sent";
      default:
        return "Unknown";
    }
  }

  export function statusColor(status: CampaignStatus): string {
    switch (status) {
      case CampaignStatus.DRAFT:
        return "bg-yellow-100 text-yellow-700";
      case CampaignStatus.SENT:
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  export function canSend(status: CampaignStatus): boolean {
    return status === CampaignStatus.DRAFT;
  }
}

export interface CampaignSummary {
  id: number;
  subject: string;
  body: string;
  status: CampaignStatus;
  sent_at: string | null;
  created_at: string;
  recipient_count: number;
}

export interface CampaignDetail extends CampaignSummary {
  recipients: CampaignRecipient[];
}

export interface CampaignRecipient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
}
