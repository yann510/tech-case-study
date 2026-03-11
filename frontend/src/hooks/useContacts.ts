import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/config";
import type { Contact, ContactDetail, CreateContactInput } from "@/types/contacts";

export interface ContactsListFilters {
  query?: string;
  sortBy?: "name" | "total_donated";
  sortOrder?: "asc" | "desc";
}

async function fetchContacts(filters: ContactsListFilters): Promise<Contact[]> {
  const params = new URLSearchParams();

  if (filters.query) params.set("query", filters.query);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE_URL}/contacts?${queryString}`
    : `${API_BASE_URL}/contacts`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch contacts");
  return response.json();
}

async function fetchContact(id: number): Promise<ContactDetail> {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch contact");
  return response.json();
}

async function createContact(data: CreateContactInput): Promise<Contact> {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create contact");
  }
  return response.json();
}

export function useContactsList(filters: ContactsListFilters) {
  return useQuery({
    queryKey: ["contacts", filters],
    queryFn: () => fetchContacts(filters),
  });
}

export function useContactDetail(id: number) {
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () => fetchContact(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
