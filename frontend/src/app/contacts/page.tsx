"use client";

import Link from "next/link";
import { useContactsContext } from "@/components/contacts/ContactsProvider";
import { ContactList } from "@/components/contacts/ContactList";

export default function ContactsPage() {
  const {
    viewMode,
    setViewMode,
    query,
    setQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useContactsContext();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <div className="flex items-center gap-3">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 text-xs font-medium ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 text-xs font-medium ${
                viewMode === "grid"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Grid
            </button>
          </div>
          <Link
            href="/contacts/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
          >
            + Add Contact
          </Link>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name or email"
          className="w-full sm:max-w-sm rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as "name" | "total_donated")
            }
            className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="name">Sort: Name</option>
            <option value="total_donated">Sort: Total Donated</option>
          </select>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as "asc" | "desc")}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <ContactList />
    </div>
  );
}
