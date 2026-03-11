"use client";

import { useEffect, useState } from "react";
import FormList from "@/components/forms/FormList";

type Form = {
  id: number;
  title: string;
  description: string;
  goal_amount: number | null;
  is_active: number;
  total_raised: number;
  donation_count: number;
  created_at: string;
};

export default function FormsPage() {
  var [forms, setForms] = useState<Form[]>([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState<string | null>(null);

  function fetchForms() {
    setLoading(true);
    fetch("http://localhost:3001/api/forms")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch forms");
        return res.json();
      })
      .then((data) => {
        setForms(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchForms();
  }, []);

  function handleDelete(id: number) {
    fetch(`http://localhost:3001/api/forms/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        fetchForms();
      })
      .catch((err) => setError(err.message));
  }

  function handleToggleActive(id: number, isActive: boolean) {
    fetch(`http://localhost:3001/api/forms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: isActive ? 1 : 0 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        fetchForms();
      })
      .catch((err) => setError(err.message));
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading forms...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Donation Forms</h1>
        <a
          href="/forms/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          + Create Form
        </a>
      </div>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      <FormList
        forms={forms}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
}
