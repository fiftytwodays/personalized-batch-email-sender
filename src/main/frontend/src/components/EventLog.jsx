import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const EventLog = ({ events, isEventLogModalOpen, onEventLogOpenChange }) => {
  return (
    <>
      <Modal
        isOpen={isEventLogModalOpen}
        onOpenChange={onEventLogOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        portalContainer={document.getElementById("app")}
      >
        <ModalContent className="text-foreground bg-background">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Events</ModalHeader>
              <ModalBody>
                <ul className="max-h-[70vh] overflow-auto">
                  <div className="grid grid-cols-2 gap-4">
                    {events.map((event, index) => {
                      if (event) {
                        const [eventName] = event.split(":");
                        return (
                          <span
                            key={index}
                            className={`${
                              eventName === "event" &&
                              "bg-gray-50 dark:bg-zinc-900 w-fit text-gray-600 dark:text-zinc-300 ring-1 ring-inset ring-gray-500/10"
                            } inline-flex items-center rounded-md px-2 py-1 text-md font-medium`}
                          >
                            {event.split(":")[1]}
                          </span>
                        );
                      }
                    })}
                  </div>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventLog;
