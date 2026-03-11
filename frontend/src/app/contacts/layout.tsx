import { ContactsProvider } from "@/components/contacts/ContactsProvider";

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContactsProvider>{children}</ContactsProvider>;
}
