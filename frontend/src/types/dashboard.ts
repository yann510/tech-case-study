export interface RecentDonation {
  id: number;
  form_id: number;
  contact_id: number;
  amount: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  form_title: string;
}

export interface DashboardSummary {
  total_raised: number;
  unique_donors: number;
  recent_donations: RecentDonation[];
}
