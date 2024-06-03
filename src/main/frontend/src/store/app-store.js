import { create } from "zustand";
import { devtools } from "zustand/middleware";

import useContactsStore from "./contacts-store";
import useEmailStore from "./email-store";

export const useAppStore = create(
  devtools((...a) => ({
    ...useEmailStore(...a),
    ...useContactsStore(...a),
  }))
);
