import useSWRMutation from "swr/mutation";

import { useAppStore } from "src/store/app-store";
import useEventStream from "src/pages/email/lib/use-event-stream";
import isValidEmailConfig from "src/pages/configurations/lib/validate-email-config";

const useSubmitEmail = (onEventLogModalOpen) => {
  const { events, clearEvents, handleStreamResponse } = useEventStream();

  const emailConfig = useAppStore((state) => state.email.config);
  const emailContent = useAppStore((state) => state.email.content);
  const contacts = useAppStore((state) => state.contacts);

  const fetcher = async (_, { arg: formData }) => {
    const response = await fetch("/api/email/send-report", {
      method: "POST",
      body: formData,
      "Content-Type": "multipart/form-data",
      headers: {
        Accept: "text/event-stream",
      },
    });

    if (response.headers.get("content-type") === "text/event-stream") {
      const streamResponse = handleStreamResponse(response);
      return new Response(streamResponse);
    }

    const data = await response.json();
    return data;
  };

  const { trigger, data, error, isValidating } = useSWRMutation(
    "/api/email/send-report",
    fetcher,
    {
      throwOnError: false,
      revalidate: false,
    }
  );

  const sendEmailReport = () => {
    if (!isValidEmailConfig(emailConfig)) {
      return false;
    }
    const emailProps = {
      emailSubject: emailContent?.subject,
      emailBody: emailContent?.body,
      "emailConfiguration.host": emailConfig?.host,
      "emailConfiguration.port": emailConfig?.port,
      "emailConfiguration.username": emailConfig?.username,
      "emailConfiguration.sender": emailConfig?.sender,
      "emailConfiguration.password": emailConfig?.password,
      "emailConfiguration.smtpAuth": emailConfig?.smtpAuth,
      "emailConfiguration.startTLSEnable": emailConfig?.startTLSEnable,
      "emailConfiguration.replyTo": emailConfig?.replyTo,

      contacts: JSON.stringify(contacts),
    };

    if (emailContent.attachments?.length > 0) {
      emailProps["emailAttachments"] = emailContent.attachments;
    }

    onEventLogModalOpen();

    clearEvents();
    const formData = new FormData();

    for (const key in emailProps) {
      if (Array.isArray(emailProps[key])) {
        emailProps[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, emailProps[key]);
      }
    }

    trigger(formData);
  };

  return {
    sendEmail: sendEmailReport,
    isSending: isValidating,
    sendError: error,
    sendSuccess: !!data,
    events: events,
  };
};

export default useSubmitEmail;
