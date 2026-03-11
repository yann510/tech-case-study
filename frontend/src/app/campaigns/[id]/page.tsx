"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { PageLayout } from "@/components/campaigns/PageLayout";
import { DataList } from "@/components/campaigns/DataList";
import {
  CampaignUtils,
  type CampaignDetail,
  type CampaignRecipient,
  CampaignStatus,
} from "@/types/campaigns";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const {
    data: campaign,
    error,
    isLoading,
  } = useSWR<CampaignDetail>(`/api/campaigns/${params.id}`);

  function handleSend() {
    if (!confirm("Are you sure you want to send this campaign?")) return;

    setSending(true);
    fetch(`${API_URL}/api/campaigns/${params.id}/send`, { method: "POST" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send");
        mutate(`/api/campaigns/${params.id}`);
        mutate("/api/campaigns");
      })
      .catch((err) => alert(err.message))
      .finally(() => setSending(false));
  }

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (error)
    return <div className="p-6 text-red-600">Failed to load campaign</div>;
  if (!campaign)
    return <div className="p-6 text-gray-500">Campaign not found</div>;

  return (
    <PageLayout
      header={
        <div>
          <Link
            href="/campaigns"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← Back to Campaigns
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            {campaign.subject}
          </h1>
        </div>
      }
      actions={
        CampaignUtils.canSend(campaign.status) ? (
          <button
            onClick={handleSend}
            disabled={sending}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Campaign"}
          </button>
        ) : undefined
      }
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs px-2 py-1 rounded-full ${CampaignUtils.statusColor(
              campaign.status
            )}`}
          >
            {CampaignUtils.formatStatus(campaign.status)}
          </span>
          {campaign.sent_at && (
            <span className="text-sm text-gray-500">
              Sent on {new Date(campaign.sent_at).toLocaleDateString()}
            </span>
          )}
          <span className="text-sm text-gray-500">
            Created on {new Date(campaign.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="bg-gray-50 rounded-md p-4 whitespace-pre-wrap text-sm text-gray-700">
          {campaign.body}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">
            Recipients ({campaign.recipients.length})
          </h2>
        </div>
        <DataList<CampaignRecipient>
          items={campaign.recipients}
          keyExtractor={(r) => r.id}
          emptyState={
            <div className="p-6 text-center text-gray-500">
              No recipients added
            </div>
          }
          renderItem={(recipient) => (
            <div className="flex items-center gap-4 px-4 py-3 text-sm">
              <div className="flex-1">
                <span className="font-medium text-gray-900">
                  {recipient.first_name} {recipient.last_name}
                </span>
              </div>
              <span className="text-gray-500">{recipient.email}</span>
            </div>
          )}
        />
      </div>
    </PageLayout>
  );
}
