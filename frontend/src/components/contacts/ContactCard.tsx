"use client";

import Link from "next/link";
import { useContactsContext } from "./ContactsProvider";
import type { Contact } from "@/types/contacts";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  const { selectedIds, toggleSelection, viewMode } = useContactsContext();
  const isSelected = selectedIds.has(contact.id);

  if (viewMode === "grid") {
    return (
      <div
        className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${
          isSelected ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelection(contact.id)}
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-xs text-gray-400">
            #{contact.id}
          </span>
        </div>
        <Link href={`/contacts/${contact.id}`} className="block">
          <h3 className="font-medium text-gray-900">
            {contact.first_name} {contact.last_name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 truncate">{contact.email}</p>
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-gray-500">
              {contact.donation_count} donation{contact.donation_count !== 1 ? "s" : ""}
            </span>
            <span className="font-medium text-green-600">
              ${(contact.total_donated / 100).toFixed(2)}
            </span>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border-b last:border-0 px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelection(contact.id)}
        className="h-4 w-4 text-blue-600 rounded border-gray-300"
      />
      <Link
        href={`/contacts/${contact.id}`}
        className="flex-1 flex items-center gap-4 min-w-0"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm">
            {contact.first_name} {contact.last_name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{contact.email}</p>
        </div>
        {contact.phone && (
          <span className="text-xs text-gray-400 hidden md:block">
            {contact.phone}
          </span>
        )}
        <div className="text-right shrink-0">
          <span className="text-sm font-medium text-green-600 block">
            ${(contact.total_donated / 100).toFixed(2)}
          </span>
          <span className="text-xs text-gray-400">
            {contact.donation_count} donation{contact.donation_count !== 1 ? "s" : ""}
          </span>
        </div>
      </Link>
    </div>
  );
}
