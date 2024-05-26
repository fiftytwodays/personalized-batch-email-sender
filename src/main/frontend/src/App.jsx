import { useState } from "react";
import { Tabs, Tab, Button, useDisclosure } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

import { Navbar, Layout, EmailBody, EventLog } from "./components";
import { Contacts } from "./pages/contacts";
import { useContacts, useSendEmailReport } from "./lib";
import {
  SettingsIcon,
  EmailIcon,
  UsersIcon,
  SendIcon,
} from "./components/icons";
import "./App.css";
import {
  hasEmailConfiguration,
  hasEmailProps,
} from "./lib/validate-email-props";
import { useAppStore } from "./store/app-store";
import { Configurations } from "./pages/configurations";

function App({ theme, toggleTheme }) {
  const emailConfig = useAppStore((state) => state.email.config);
  const updateEmailConfig = useAppStore((state) => state.updateEmailConfig);

  const [selectedTabKey, setSelectedTabKey] = useState("configurations");

  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const { contacts } = useContacts();

  const { sendEmailReport, events } = useSendEmailReport();
  const {
    isOpen: isEventLogModalOpen,
    onOpen: onEventLogModalOpen,
    onOpenChange: onEventLogOpenChange,
  } = useDisclosure();
  const tabsList = ["configurations", "contacts", "email"];

  const submitBatchEmail = () => {
    const emailProps = {
      emailSubject: emailSubject,
      emailBody: emailBody,
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

    if (attachments?.length > 0) {
      emailProps["emailAttachments"] = attachments;
    }

    if (
      hasEmailConfiguration({ emailConfiguration: emailConfig }) &&
      hasEmailProps({ emailSubject, emailBody, attachments })
    ) {
      sendEmailReport(emailProps);
      onEventLogModalOpen();
    }
  };

  const handleNextClick = () => {
    const currentIndex = tabsList.indexOf(selectedTabKey);
    if (currentIndex === tabsList.length - 1) return;
    const nextIndex = (currentIndex + 1) % tabsList.length;
    const nextTabKey = tabsList[nextIndex];
    setSelectedTabKey(nextTabKey);
  };

  const handlePreviousClick = () => {
    const currentIndex = tabsList.indexOf(selectedTabKey);
    if (currentIndex === 0) return;
    const previousIndex =
      (currentIndex - 1 + tabsList.length) % tabsList.length;
    const previousTabKey = tabsList[previousIndex];
    setSelectedTabKey(previousTabKey);
  };

  return (
    <Layout className={`${theme} text-foreground bg-background dark:bg-black`}>
      <Navbar toggleTheme={toggleTheme} />

      <div id="app" className="mt-12  text-foreground">
        <form
          className="flex flex-col  items-center"
          onSubmit={submitBatchEmail}
        >
          <Tabs
            selectedKey={selectedTabKey}
            aria-label="Options"
            color="primary"
            variant="bordered"
            onSelectionChange={(key) => setSelectedTabKey(key)}
          >
            <Tab
              key="configurations"
              title={
                <div className="flex items-center space-x-2">
                  <SettingsIcon />
                  <span>Configurations</span>
                </div>
              }
            >
              <Configurations
                emailConfig={emailConfig}
                updateEmailConfig={updateEmailConfig}
              />
            </Tab>
            <Tab
              key="contacts"
              title={
                <div className="flex items-center space-x-2">
                  <UsersIcon />
                  <span>Contacts</span>
                </div>
              }
            >
              <Contacts />
            </Tab>
            <Tab
              key="email"
              title={
                <div className="flex items-center space-x-2">
                  <EmailIcon />
                  <span>Email</span>
                </div>
              }
            >
              <EmailBody
                attachments={attachments}
                setAttachments={setAttachments}
                emailSubject={emailSubject}
                setEmailSubject={setEmailSubject}
                emailBody={emailBody}
                setEmailBody={setEmailBody}
              />
            </Tab>
          </Tabs>

          <div className="flex mt-20 w-96 justify-between">
            <Button variant="bordered" onClick={handlePreviousClick}>
              Previous
            </Button>
            {selectedTabKey === "email" ? (
              <Button
                color="primary"
                onPress={submitBatchEmail}
                endContent={<SendIcon className="w-4 h-4 text-zinc-50" />}
              >
                Send email
              </Button>
            ) : (
              <Button color="primary" onPress={handleNextClick}>
                Next
              </Button>
            )}
          </div>
        </form>
      </div>

      <Toaster
        toastOptions={{
          className: `${theme} text-foreground bg-background`,
          style: {
            color: theme === "dark" ? "#fff" : "000",
            backgroundColor: theme === "dark" ? "#222" : "#fff",
          },
        }}
      />

      <EventLog
        events={events}
        isEventLogModalOpen={isEventLogModalOpen}
        onEventLogOpenChange={onEventLogOpenChange}
      />
    </Layout>
  );
}

export default App;
