import { produce } from "immer";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const useContactsStore = devtools((set) => ({
  contacts: [],
  addContact: (contact) =>
    set(
      produce((state) => {
        state.contacts.push({
          ...contact,
          serialNo: uuidv4(),
        });
      })
    ),
  updateContact: (newContact) => {
    return set(
      produce((state) => {
        const index = state.contacts.findIndex(
          (contact) => contact.serialNo === newContact?.serialNo
        );

        if (index !== -1) {
          state.contacts[index] = { ...state.contacts[index], ...newContact };
        }
      })
    );
  },
  deleteContact: (serialNo) =>
    set(
      produce((state) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.serialNo !== serialNo
        );
      })
    ),
}));

export default useContactsStore;
