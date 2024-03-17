import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import hasEmailConfiguration from "./validate-email-props";

const fetcher = async (_, { arg: emailProperties }) => {
  const response = await fetch("/api/email-settings/test", {
    method: "POST",
    body: JSON.stringify(emailProperties),
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

const useTestEmailProperties = () => {
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

  const testEmailProperties = (emailProperties) => {
    if (hasEmailConfiguration(emailProperties)) {
      trigger(emailProperties);
    } else {
      toast.error("Invalid email configuration");
    }
  };

  return {
    testEmailProperties,
    isTesting: isMutating,
    testError: error,
    testSuccess: !!data,
  };
};

export default useTestEmailProperties;
