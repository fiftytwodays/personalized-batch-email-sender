import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { isValidEmailConfig } from "./validate-email-config";

const fetcher = async (_, { arg: emailConfig }) => {
  const response = await fetch("/api/email-settings/test", {
    method: "POST",
    body: JSON.stringify(emailConfig),
    headers: {
      "Content-Type": "application/json",
      // Add any necessary headers for file uploading
      // For example, you might need to set the content type:
      // "Content-Type": "multipart/form-data",
    },
  });
  const data = await response?.ok;
  return data;
};

const useTestEmailConfig = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/email/config/test",
    fetcher,
    {
      onSuccess: (fetchedData) => {
        fetchedData && toast.success("Test successful!");
      },
      onError: () => {
        toast.error("Testing failed.");
      },

      throwOnError: false,
      revalidate: false,
    }
  );

  const testEmailConfig = (config) => {
    if (isValidEmailConfig(config)) {
      trigger({
        emailConfiguration: {
          sender: config?.sender,
          host: config?.host,
          username: config?.username,
          password: config?.password,
          port: parseInt(config?.port, 10),
          smtpAuth: config?.smtpAuth,
          startTLSEnable: config?.startTLSEnable,
          replyTo: config?.replyTo,
        },
        receiver: config?.receiver,
      });
    } else {
      toast.error("Invalid email configuration");
    }
  };

  return {
    testEmailConfig,
    isTesting: isMutating,
    testError: error,
    testSuccess: !!data,
  };
};

export default useTestEmailConfig;
