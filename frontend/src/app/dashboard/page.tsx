"use client";

import useSWR from "swr";
import type { DashboardSummary } from "@/types/dashboard";

function formatCurrency(valueInCents: number) {
  return `$${(valueInCents / 100).toFixed(2)}`;
}

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR<DashboardSummary>(
    "/api/dashboard/summary"
  );

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
          {error.message}
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-gray-500">No dashboard data available</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Organization Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Quick snapshot of fundraising performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm text-gray-500 block">Total Raised</span>
              <span className="text-3xl font-bold text-gray-900 mt-2 block">
                {formatCurrency(data.total_raised)}
              </span>
              <span className="text-sm text-green-700 mt-2 block">
                Across all donation forms
              </span>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">
              💰
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm text-gray-500 block">Unique Donors</span>
              <span className="text-3xl font-bold text-gray-900 mt-2 block">
                {data.unique_donors}
              </span>
              <span className="text-sm text-blue-700 mt-2 block">
                Distinct supporters who donated
              </span>
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">
              👥
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Donations</h2>
        </div>
        {data.recent_donations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No donations yet</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="px-4 py-3 font-medium">Donor</th>
                <th className="px-4 py-3 font-medium">Form</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recent_donations.map((donation) => (
                <tr key={donation.id} className="border-b last:border-0 text-sm">
                  <td className="px-4 py-3">
                    {donation.first_name} {donation.last_name}
                  </td>
                  <td className="px-4 py-3">{donation.form_title}</td>
                  <td className="px-4 py-3 font-medium">
                    {formatCurrency(donation.amount)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(donation.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
