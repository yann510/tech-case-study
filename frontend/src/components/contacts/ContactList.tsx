"use client";

import { useContactsContext } from "./ContactsProvider";
import { ContactCard } from "./ContactCard";

export function ContactList() {
  const { contacts, isLoading, error, viewMode, selectedIds, selectAll, clearSelection } =
    useContactsContext();

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading contacts...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm">
        Failed to load contacts: {error.message}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No contacts yet</p>
        <p className="text-sm mt-1">Contacts will appear here once donors contribute</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{contacts.length} contacts</span>
          {selectedIds.size > 0 && (
            <>
              <span>·</span>
              <span>{selectedIds.size} selected</span>
              <button
                onClick={clearSelection}
                className="text-blue-600 hover:text-blue-800"
              >
                Clear
              </button>
            </>
          )}
          {selectedIds.size === 0 && (
            <button
              onClick={selectAll}
              className="text-blue-600 hover:text-blue-800"
            >
              Select all
            </button>
          )}
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
}
