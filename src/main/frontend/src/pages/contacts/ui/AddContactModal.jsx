import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

export default function AddContactModal({
  isOpen,
  onOpenChange,
  contact,
  setContact,
  addContact,
  updateContact,
}) {
  const [contactForm, setContactForm] = useState(
    contact || {
      serialNo: "",
      name: "",
      prefix: "",
      nickName: "",
      email: "",
      phoneNo: "",
    }
  );

  const updateContactForm = (key, value) => {
    setContactForm({ ...contactForm, [key]: value });
  };

  const clearDefaultData = () => {
    setContactForm({
      serialNo: "",
      name: "",
      prefix: "",
      nickName: "",
      email: "",
      phoneNo: "",
    });
    setContact(null);
  };

  const rootDiv = document.getElementById("app");
  return (
    <>
      <Modal
        className="text-foreground"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        portalContainer={rootDiv}
        disableAnimation
        defaultOpen={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new contact
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  placeholder="Enter a name"
                  variant="bordered"
                  onValueChange={(value) => updateContactForm("name", value)}
                  value={contactForm?.name}
                />
                <Input
                  label="Email"
                  placeholder="Enter an email"
                  variant="bordered"
                  onValueChange={(value) => updateContactForm("email", value)}
                  value={contactForm?.email}
                />
                <Input
                  label="Nick name"
                  placeholder="Enter an nickname"
                  variant="bordered"
                  onValueChange={(value) =>
                    updateContactForm("nickName", value)
                  }
                  value={contactForm?.nickName}
                />
                <Input
                  label="Prefix"
                  placeholder="Enter a prefix"
                  variant="bordered"
                  onValueChange={(value) => updateContactForm("prefix", value)}
                  value={contactForm?.prefix}
                />
                <Input
                  label="Phone"
                  placeholder="Enter phone number"
                  variant="bordered"
                  onValueChange={(value) => updateContactForm("phoneNo", value)}
                  value={contactForm?.phoneNo}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onClose();
                    clearDefaultData();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (contact) {
                      console.log("sdfsdf");
                      updateContact(contactForm);
                    } else {
                      addContact(contactForm);
                    }
                    onClose();
                    clearDefaultData();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
