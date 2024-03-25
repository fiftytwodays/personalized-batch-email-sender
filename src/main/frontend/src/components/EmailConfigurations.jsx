import {
  Input,
  Accordion,
  AccordionItem,
  Checkbox,
  Button,
} from "@nextui-org/react";

import InfoToolTip from "./InfoToolTip";
import EmailConfigUploader from "./EmailConfigUploader";
import { useTestEmailProperties } from "../lib";

function EmailConfigurations({ emailProperties, setEmailProperties }) {
  const { testEmailProperties } = useTestEmailProperties();

  const updateEmailProperties = (key, value) => {
    setEmailProperties({ ...emailProperties, [key]: value });
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      <EmailConfigUploader setEmailProperties={setEmailProperties} />

      <div className="flex items-center mb-4">
        <div className="flex-1 bg-gray-300 dark:bg-gray-700 h-px"></div>
        <div className="mx-4 text-foreground">or</div>
        <div className="flex-1 bg-gray-300 dark:bg-gray-700 h-px"></div>
      </div>

      <div className="flex flex-col gap-6">
        <Input
          onValueChange={(value) => updateEmailProperties("sender", value)}
          size="md"
          type="text"
          label="Sender"
          placeholder="Enter your name"
          value={emailProperties?.sender}
          name="sender"
        />

        <div className="flex gap-4">
          <Input
            onValueChange={(value) => updateEmailProperties("host", value)}
            size="md"
            type="text"
            label="Host"
            placeholder="Eg: smtp.gmail.com"
            className="grow"
            value={emailProperties?.host}
            name="host"
          />
          <Input
            onValueChange={(value) =>
              updateEmailProperties("port", parseInt(value, 10) || 0)
            }
            size="md"
            type="number"
            label="Port"
            placeholder="Eg: 587"
            className="flex-none w-32"
            min="1"
            max="65535"
            value={emailProperties?.port}
            name="port"
          />
        </div>

        <Input
          onValueChange={(value) => updateEmailProperties("username", value)}
          size="md"
          type="email"
          label="Username"
          placeholder="Enter your username"
          value={emailProperties?.username}
        />
        <Input
          onValueChange={(value) => updateEmailProperties("password", value)}
          size="md"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={emailProperties?.password}
        />

        <div className="max-w-96 flex justify-between">
          <div className="flex h-6 items-center gap-4">
            <Checkbox
              onValueChange={(isSelected) =>
                updateEmailProperties("smtpAuth", isSelected)
              }
              value={emailProperties?.smtpAuth}
              defaultSelected
            >
              SMTP Auth
            </Checkbox>
            <InfoToolTip content="Securely verify the sender‘s identity for enhanced email security." />
          </div>
          <div className="flex h-6 items-center gap-4">
            <Checkbox
              onValueChange={(isSelected) =>
                updateEmailProperties("startTLSEnable", isSelected)
              }
              value={emailProperties?.startTLSEnable}
              defaultSelected
            >
              Start TLS
            </Checkbox>
            <InfoToolTip
              content="Establish a secure communication channel for private and
                  protected email transmission."
            />
          </div>
        </div>

        <Accordion keepContentMounted>
          <AccordionItem
            key="1"
            aria-label="Additional Properties"
            title="Additional Properties"
          >
            <div className="flex flex-col gap-4">
              <Input
                onValueChange={(value) =>
                  updateEmailProperties("replyTo", value)
                }
                size="md"
                type="text"
                label="Reply to"
                placeholder="Enter an email"
                value={emailProperties?.replyTo}
              />

              <Input
                onValueChange={(value) =>
                  updateEmailProperties("receiver", value)
                }
                size="md"
                type="text"
                label="Receiver"
                placeholder="Enter an email"
                value={emailProperties?.receiver}
              />
            </div>
          </AccordionItem>
        </Accordion>

        <Button
          color="primary"
          size="sm"
          variant="flat"
          onClick={(e) => {
            e.preventDefault();

            testEmailProperties({
              emailConfiguration: {
                sender: emailProperties?.sender,
                host: emailProperties?.host,
                username: emailProperties?.username,
                password: emailProperties?.password,
                port: parseInt(emailProperties?.port, 10),
                smtpAuth: emailProperties?.smtpAuth,
                startTLSEnable: emailProperties?.startTLSEnable,
                replyTo: emailProperties?.replyTo,
              },
              receiver: emailProperties?.receiver,
            });
          }}
        >
          Test properties
        </Button>
      </div>
    </div>
  );
}

export default EmailConfigurations;
