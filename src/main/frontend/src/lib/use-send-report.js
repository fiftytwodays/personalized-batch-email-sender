import useSWRMutation from "swr/mutation";

import { useAppStore } from "src/store/app-store";
import useEventStream from "src/pages/email/lib/use-event-stream";
import isValidEmailConfig from "src/pages/configurations/lib/validate-email-config";

const useSendEmailReport = (onEventLogModalOpen) => {
  const { events, clearEvents, handleStreamResponse } = useEventStream();

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

  const sendEmailReport = (props) => {
    if (!isValidEmailConfig(props)) {
      return false;
    }
    const emailProps = {
      emailSubject: emailContent?.subject,
      emailBody: emailContent?.body,
      "emailConfiguration.host": props?.host,
      "emailConfiguration.port": props?.port,
      "emailConfiguration.username": props?.username,
      "emailConfiguration.sender": props?.sender,
      "emailConfiguration.password": props?.password,
      "emailConfiguration.smtpAuth": props?.smtpAuth,
      "emailConfiguration.startTLSEnable": props?.startTLSEnable,
      "emailConfiguration.replyTo": props?.replyTo,

      contacts: JSON.stringify(contacts),
    };

    if (emailContent.attachments?.length > 0) {
      emailProps["emailAttachments"] = emailContent.attachments;
    }

    sendEmailReport(emailProps);
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
    sendEmailReport: sendEmailReport,
    isSending: isValidating,
    sendError: error,
    sendSuccess: !!data,
    events: events,
  };
};

export default useSendEmailReport;
