"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { PageLayout } from "@/components/campaigns/PageLayout";
import type { CampaignRecipient } from "@/types/campaigns";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function NewCampaignPage() {
  const router = useRouter();
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedRecipientIds, setSelectedRecipientIds] = useState<number[]>(
    []
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: contacts = [] } = useSWR<CampaignRecipient[]>("/api/contacts");

  function toggleRecipient(id: number) {
    setSelectedRecipientIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function selectAllRecipients() {
    setSelectedRecipientIds(contacts.map((c) => c.id));
  }

  function clearRecipients() {
    setSelectedRecipientIds([]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = subjectRef.current?.value?.trim();
    const body = bodyRef.current?.value?.trim();

    if (!subject) {
      setError("Subject is required");
      subjectRef.current?.focus();
      return;
    }
    if (!body) {
      setError("Body is required");
      bodyRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setError(null);

    fetch(`${API_URL}/api/campaigns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        body,
        recipientIds: selectedRecipientIds,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create campaign");
        return res.json();
      })
      .then(() => {
        mutate("/api/campaigns");
        router.push("/campaigns");
      })
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  }

  return (
    <PageLayout
      header={
        <h1 className="text-2xl font-bold text-gray-900">New Campaign</h1>
      }
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject *
          </label>
          <input
            ref={subjectRef}
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Email subject line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body *
          </label>
          <textarea
            ref={bodyRef}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={8}
            placeholder="Write your email content..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Recipients ({selectedRecipientIds.length} selected)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllRecipients}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Select all
              </button>
              <button
                type="button"
                onClick={clearRecipients}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto">
            {contacts.map((contact) => (
              <label
                key={contact.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b last:border-0"
              >
                <input
                  type="checkbox"
                  checked={selectedRecipientIds.includes(contact.id)}
                  onChange={() => toggleRecipient(contact.id)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span>
                  {contact.first_name} {contact.last_name}
                </span>
                <span className="text-gray-400 text-xs">{contact.email}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Campaign"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/campaigns")}
            className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </PageLayout>
  );
}
