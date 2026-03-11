"use client";

import FormActions from "./FormActions";

export default function FormCard({
  form,
  onDelete,
  onToggleActive,
}: {
  form: {
    id: number;
    title: string;
    description: string;
    goal_amount: number | null;
    is_active: number;
    total_raised: number;
    donation_count: number;
    created_at: string;
  };
  onDelete: (id: number) => void;
  onToggleActive: (id: number, active: boolean) => void;
}) {
  var goalFormatted =
    form.goal_amount !== null
      ? `$${(form.goal_amount / 100).toFixed(2)}`
      : "No goal";
  var raisedFormatted = `$${(form.total_raised / 100).toFixed(2)}`;
  var progress =
    form.goal_amount !== null && form.goal_amount > 0
      ? Math.min(100, Math.round((form.total_raised / form.goal_amount) * 100))
      : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{form.title}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {form.description}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            form.is_active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {form.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
        <div>
          <span className="text-gray-500 block">Raised</span>
          <span className="font-medium">{raisedFormatted}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Goal</span>
          <span className="font-medium">{goalFormatted}</span>
        </div>
        <div>
          <span className="text-gray-500 block">Donations</span>
          <span className="font-medium">{form.donation_count}</span>
        </div>
      </div>

      {progress !== null && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 mt-1">{progress}% funded</span>
        </div>
      )}

      <FormActions
        formId={form.id}
        isActive={!!form.is_active}
        onToggleActive={onToggleActive}
        onDelete={onDelete}
      />
    </div>
  );
}
