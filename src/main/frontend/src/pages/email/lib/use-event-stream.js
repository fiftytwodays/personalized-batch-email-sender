import { useState } from "react";

function useEventStream() {
  const [events, setEvents] = useState([]);

  const updateUI = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  const handleStreamResponse = (response) => {
    const reader = response.body.getReader();

    return new ReadableStream({
      async start(controller) {
        let buffer = "";

        const processStream = async () => {
          const { done, value } = await reader.read();

          if (done) {
            controller.close();
            reader.releaseLock();
            return;
          }

          const chunk = new TextDecoder().decode(value);
          buffer += chunk;

          const lines = buffer.split("\n");
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            const event = line + "";
            updateUI(event);
          }

          buffer = lines[lines.length - 1];

          // Recursively call processStream to continue reading
          await processStream();
        };

        // Start the recursive processing
        await processStream();
      },
    });
  };

  return {
    events,
    clearEvents,
    handleStreamResponse,
  };
}

export default useEventStream;
