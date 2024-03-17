import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

export default function UpdateContact({
  isOpen,
  onOpenChange,
  updateContact,
  defaultContactForm,
  setDefaultContactForm,
}) {
  const [contactForm, setContactForm] = useState({
    serialNo: "",
    name: "",
    prefix: "",
    nickName: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (
      defaultContactForm &&
      defaultContactForm?.name &&
      defaultContactForm?.email
    ) {
      setContactForm({ ...defaultContactForm });
    }
  }, [defaultContactForm]);

  // const updateContacts = () => {
  //   // check if the contact has all the valid props
  //   // create a function that do this
  //   // if it has all the valid prop then call addNewContact
  //   // clear the contact state when the modal closes
  //   if (contact?.name && contact?.email) {
  //     updateContacts({
  //       ...contact,
  //       serialNo: uuidv4(),
  //     });
  //   }
  // };

  const updateContactForm = (key, value) => {
    setContactForm({ ...contactForm, [key]: value });
  };

  const clearDefaultData = () => {
    setDefaultContactForm({
      serialNo: "",
      name: "",
      prefix: "",
      nickName: "",
      email: "",
      phoneNo: "",
    });

    setContactForm({
      serialNo: "",
      name: "",
      prefix: "",
      nickName: "",
      email: "",
      phoneNo: "",
    });
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
                  autoFocus
                  label="Email"
                  placeholder="Enter an email"
                  variant="bordered"
                  onValueChange={(value) => updateContactForm("email", value)}
                  value={contactForm?.email}
                />
                <Input
                  autoFocus
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
                  autoFocus
                  variant="bordered"
                  onValueChange={(value) => updateContactForm("prefix", value)}
                  value={contactForm?.prefix}
                />
                <Input
                  label="Phone"
                  placeholder="Enter phone number"
                  autoFocus
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
                    updateContact(contactForm);
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
