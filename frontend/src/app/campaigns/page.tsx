"use client";

import Link from "next/link";
import useSWR from "swr";
import { PageLayout } from "@/components/campaigns/PageLayout";
import { DataList } from "@/components/campaigns/DataList";
import {
  CampaignStatus,
  CampaignUtils,
  type CampaignSummary,
} from "@/types/campaigns";

export default function CampaignsPage() {
  const { data: campaigns = [], error, isLoading } = useSWR<CampaignSummary[]>("/api/campaigns");

  return (
    <PageLayout
      header={<h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>}
      actions={
        <Link
          href="/campaigns/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          + New Campaign
        </Link>
      }
    >
      <DataList<CampaignSummary>
        items={campaigns}
        keyExtractor={(c) => c.id}
        loading={isLoading}
        loadingMessage="Loading campaigns..."
        error={error}
        emptyState={
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No campaigns yet</p>
            <p className="text-sm mt-1">Create your first email campaign</p>
          </div>
        }
        renderItem={(campaign) => (
          <Link
            href={`/campaigns/${campaign.id}`}
            className="block bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {campaign.subject}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {campaign.body}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ml-3 shrink-0 ${CampaignUtils.statusColor(
                  campaign.status
                )}`}
              >
                {CampaignUtils.formatStatus(campaign.status)}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span>{campaign.recipient_count} recipients</span>
              {campaign.sent_at && (
                <span>
                  Sent {new Date(campaign.sent_at).toLocaleDateString()}
                </span>
              )}
              <span>
                Created {new Date(campaign.created_at).toLocaleDateString()}
              </span>
            </div>
          </Link>
        )}
      />
    </PageLayout>
  );
}
