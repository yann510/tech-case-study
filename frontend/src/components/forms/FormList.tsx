"use client";

import FormCard from "./FormCard";

export default function FormList({
  forms,
  onDelete,
  onToggleActive,
}: {
  forms: {
    id: number;
    title: string;
    description: string;
    goal_amount: number | null;
    is_active: number;
    total_raised: number;
    donation_count: number;
    created_at: string;
  }[];
  onDelete: (id: number) => void;
  onToggleActive: (id: number, active: boolean) => void;
}) {
  if (forms.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No forms yet</p>
        <p className="text-sm mt-1">Create your first donation form to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
