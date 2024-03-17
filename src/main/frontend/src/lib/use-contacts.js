import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const fetcher = async (_, { arg: formData }) => {
  const response = await fetch("/api/excel/parse", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

const useContacts = () => {
  const [contacts, setContacts] = useState([]);

  const { trigger } = useSWRMutation("/api/excel/parse", fetcher, {
    onSuccess: (data) => {
      data && toast.success("Successfully parsed!");
      setContacts([...data]);
    },
    onError: () => {
      toast.error("Parsing failed.");
    },
    throwOnError: false,
    revalidate: false,
  });

  const parseContacts = (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    trigger(formData);
  };

  const updateOrAddContact = (newContact) => {
    const existingContactIndex = contacts.findIndex(
      (contact) => contact.serialNo === newContact.serialNo
    );

    if (existingContactIndex !== -1 && newContact?.name && newContact?.email) {
      // Update existing contact
      updateContact(newContact, existingContactIndex);
    } else if (newContact?.name && newContact?.email) {
      // Add new contact
      addContact(newContact);
    }
  };

  const updateContact = (newContact, existingContactIndex) => {
    const updatedContacts = [...contacts];
    updatedContacts[existingContactIndex] = newContact;
    setContacts(updatedContacts);
  };

  const addContact = (newContact) => {
    setContacts([
      ...contacts,
      {
        ...newContact,
        serialNo: uuidv4(),
      },
    ]);
  };

  const deleteContact = (serialNo) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.serialNo !== serialNo)
    );
  };

  return {
    contacts,
    parseContacts,
    updateOrAddContact,
    deleteContact,
  };
};

export default useContacts;
