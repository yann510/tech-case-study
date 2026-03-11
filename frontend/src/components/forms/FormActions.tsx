"use client";

export default function FormActions({
  formId,
  isActive,
  onToggleActive,
  onDelete,
}: {
  formId: number;
  isActive: boolean;
  onToggleActive: (id: number, active: boolean) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onToggleActive(formId, !isActive)}
        className={`text-xs px-2 py-1 rounded ${
          isActive
            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            : "bg-green-100 text-green-700 hover:bg-green-200"
        }`}
      >
        {isActive ? "Deactivate" : "Activate"}
      </button>
      <a
        href={`/forms/${formId}`}
        className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        View
      </a>
      <button
        onClick={() => {
          if (confirm("Are you sure you want to delete this form?")) {
            onDelete(formId);
          }
        }}
        className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
      >
        Delete
      </button>
    </div>
  );
}
