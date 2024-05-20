import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";

import { useAppStore } from "../store/app-store";

const fetcher = async (_, { arg: formData }) => {
  const response = await fetch("/api/excel/parse", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

const useContacts = () => {
  const contacts = useAppStore((state) => state.contacts);
  const addContact = useAppStore((state) => state.addContact);
  const updateContact = useAppStore((state) => state.updateContact);
  const deleteContact = useAppStore((state) => state.deleteContact);

  const { trigger } = useSWRMutation("/api/excel/parse", fetcher, {
    onSuccess: (data) => {
      data && toast.success("Successfully parsed!");
      data.map((contact) => addContact(contact));
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

  return {
    contacts,
    parseContacts,
    addContact,
    updateContact,
    deleteContact,
  };
};

export default useContacts;
