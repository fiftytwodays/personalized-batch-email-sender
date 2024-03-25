import { useState, useEffect } from "react";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";

import hasEmailConfiguration from "./validate-email-props";

const fetcher = async (_, { arg: emailProperties }) => {
  const response = await fetch("/api/email-settings/test", {
    method: "POST",
    body: JSON.stringify(emailProperties),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response?.ok;
  return data;
};

const useTestEmailProperties = () => {
  const [isTesting, setIsTesting] = useState(false);
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/email/config/test",
    fetcher,
    {
      onSuccess: (fetchedData) => {
        toast.dismiss();
        fetchedData && toast.success("Test successful!");
      },
      onError: () => {
        toast.dismiss();
        toast.error("Testing failed.");
      },

      throwOnError: false,
      revalidate: false,
    }
  );

  const testEmailProperties = (emailProperties) => {
    if (hasEmailConfiguration(emailProperties)) {
      setIsTesting(true);
      toast.loading("Testing..");
      trigger(emailProperties);
    } else {
      toast.error("Invalid email configuration");
    }
  };
  useEffect(() => {
    // Reset loading state after mutation completes (success or error)
    if (!isMutating) {
      setIsTesting(false);
    }
  }, [isMutating]);

  return {
    testEmailProperties,
    isTesting: isTesting,
    testError: error,
    testSuccess: !!data,
  };
};

export default useTestEmailProperties;
