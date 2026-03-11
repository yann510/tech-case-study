"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useContactsList } from "@/hooks/useContacts";
import type { Contact } from "@/types/contacts";

interface ContactsContextValue {
  contacts: Contact[];
  isLoading: boolean;
  error: Error | null;
  selectedIds: Set<number>;
  toggleSelection: (id: number) => void;
  clearSelection: () => void;
  selectAll: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ContactsContext = createContext<ContactsContextValue | null>(null);

export function useContactsContext() {
  const ctx = useContext(ContactsContext);
  if (!ctx) {
    throw new Error(
      "useContactsContext must be used within a ContactsProvider"
    );
  }
  return ctx;
}

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const { data: contacts = [], isLoading, error } = useContactsList();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const toggleSelection = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(contacts.map((c) => c.id)));
  }, [contacts]);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isLoading,
        error: error as Error | null,
        selectedIds,
        toggleSelection,
        clearSelection,
        selectAll,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
