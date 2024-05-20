import { produce } from "immer";

const useEmailStore = (set) => ({
  email: {
    config: {
      sender: "",
      host: "smtp.gmail.com",
      username: "",
      password: "",
      port: 587,
      smtpAuth: true,
      startTLSEnable: true,
      replyTo: "",
      receiver: "",
    },
    content: {
      subject: "",
      body: null,
      attachments: [],
    },
  },
  updateEmailConfig: (config) =>
    set(
      produce((state) => {
        state.email.config = { ...state.email.config, ...config };
      })
    ),
  updateEmailContent: (content) =>
    set(
      produce((state) => {
        state.email.content = { ...state.email.content, ...content };
      })
    ),
});

export default useEmailStore;
