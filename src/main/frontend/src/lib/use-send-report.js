import { useState } from "react";
import useSWRMutation from "swr/mutation";

const useSendEmailReport = () => {
  const [events, setEvents] = useState([]);

  const handleStreamResponse = (response) => {
    const reader = response.body.getReader();

    return new ReadableStream({
      async start(controller) {
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Convert the byte array to a string
          const chunk = new TextDecoder().decode(value);

          buffer += chunk;

          // Split the buffer into lines
          const lines = buffer.split("\n");
          // Process each line except the last one (incomplete)
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];

            // Assuming the value is a string
            const event = line + "";
            // Update your UI based on the received event
            updateUI(event);
          }

          // Store the last line in the buffer
          buffer = lines[lines.length - 1];
        }

        controller.close();
        reader.releaseLock();
      },
    });
  };

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

  const updateUI = (event) => {
    // Update the events array with the new event
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const sendEmailReport = (emailProps) => {
    setEvents([]);
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
