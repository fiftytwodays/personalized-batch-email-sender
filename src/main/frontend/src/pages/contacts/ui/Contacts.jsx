import ContactsTable from "./ContactsTable";
import useContacts from "../lib/use-contacts";

function Contacts() {
  const { contacts, addContact, updateContact, deleteContact, parseContacts } =
    useContacts();
  return (
    <ContactsTable
      contacts={contacts}
      addContact={addContact}
      updateContact={updateContact}
      deleteContact={deleteContact}
      parseContacts={parseContacts}
    />
  );
}

export default Contacts;
