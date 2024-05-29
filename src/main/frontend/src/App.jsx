import { useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  useDisclosure,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

import { Contacts } from "./pages/contacts";
import { Email } from "./pages/email";
import { Configurations } from "./pages/configurations";

import { Navbar, Layout, EventLog } from "./components";
import {
  SettingsIcon,
  EmailIcon,
  UsersIcon,
  SendIcon,
} from "./components/icons";
import "./App.css";

import useSubmitEmail from "./pages/email/lib/use-submit-email";

function App({ theme, toggleTheme }) {
  const [selectedTabKey, setSelectedTabKey] = useState("configurations");
  const {
    isOpen: isEventLogModalOpen,
    onOpen: onEventLogModalOpen,
    onOpenChange: onEventLogOpenChange,
  } = useDisclosure();

  const { events, sendEmail } = useSubmitEmail(onEventLogModalOpen);

  const tabsList = ["configurations", "contacts", "email"];

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
        <form className="flex flex-col  items-center">
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
              <Configurations />
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
              <Email />
            </Tab>
          </Tabs>

          <div
            className="flex z-10 bg-background p-8 justify-center sticky bottom-0 mt-20 w-full"
            // style={{
            //   boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
            // }}
          >
            <Card shadow="sm">
              <CardBody>
                <div className="flex max-w-80 w-lvw justify-between">
                  <Button variant="bordered" onClick={handlePreviousClick}>
                    Previous
                  </Button>
                  {selectedTabKey === "email" ? (
                    <Button
                      color="primary"
                      onPress={sendEmail}
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
              </CardBody>
            </Card>
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
