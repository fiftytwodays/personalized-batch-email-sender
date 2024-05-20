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

function EmailConfigurations({ emailConfig, updateEmailConfig }) {
  const { testEmailProperties } = useTestEmailProperties();

  // const updateEmailProperties = (key, value) => {
  //   setEmailProperties({ ...emailProperties, [key]: value });
  // };

  

  return (
    <div className="mt-8 flex flex-col gap-4">
      <EmailConfigUploader updateEmailConfig={updateEmailConfig} />

      <div className="flex items-center mb-4">
        <div className="flex-1 bg-gray-300 dark:bg-gray-700 h-px"></div>
        <div className="mx-4 text-foreground">or</div>
        <div className="flex-1 bg-gray-300 dark:bg-gray-700 h-px"></div>
      </div>

      <div className="flex flex-col gap-6">
        <Input
          onValueChange={(value) => updateEmailConfig({"sender": value})}
          size="md"
          type="text"
          label="Sender"
          placeholder="Enter your name"
          value={emailConfig?.sender}
          name="sender"
        />

        <div className="flex gap-4">
          <Input
            onValueChange={(value) => updateEmailConfig({"host": value})}
            size="md"
            type="text"
            label="Host"
            placeholder="Eg: smtp.gmail.com"
            className="grow"
            value={emailConfig?.host}
            name="host"
          />
          <Input
            onValueChange={(value) =>
              updateEmailConfig({"port": parseInt(value, 10)})
            }
            size="md"
            type="number"
            label="Port"
            placeholder="Eg: 587"
            className="flex-none w-32"
            value={emailConfig?.port}
            name="port"
          />
        </div>

        <Input
          onValueChange={(value) => updateEmailConfig({"username": value})}
          size="md"
          type="email"
          label="Username"
          placeholder="Enter your username"
          value={emailConfig?.username}
        />
        <Input
          onValueChange={(value) => updateEmailConfig({"password": value})}
          size="md"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={emailConfig?.password}
        />

        <div className="max-w-96 flex justify-between">
          <div className="flex h-6 items-center gap-4">
            <Checkbox
              onValueChange={(isSelected) =>
                updateEmailConfig({"smtpAuth": isSelected})
              }
              value={emailConfig?.smtpAuth}
              defaultSelected
            >
              SMTP Auth
            </Checkbox>
            <InfoToolTip content="Securely verify the sender‘s identity for enhanced email security." />
          </div>
          <div className="flex h-6 items-center gap-4">
            <Checkbox
              onValueChange={(isSelected) =>
                updateEmailConfig({"startTLSEnable": isSelected})
              }
              value={emailConfig?.startTLSEnable}
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
                  updateEmailConfig({"replyTo": value})
                }
                size="md"
                type="text"
                label="Reply to"
                placeholder="Enter an email"
                value={emailConfig?.replyTo}
              />

              <Input
                onValueChange={(value) =>
                  updateEmailConfig({"receiver": value})
                }
                size="md"
                type="text"
                label="Receiver"
                placeholder="Enter an email"
                value={emailConfig?.receiver}
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
                sender: emailConfig?.sender,
                host: emailConfig?.host,
                username: emailConfig?.username,
                password: emailConfig?.password,
                port: parseInt(emailConfig?.port, 10),
                smtpAuth: emailConfig?.smtpAuth,
                startTLSEnable: emailConfig?.startTLSEnable,
                replyTo: emailConfig?.replyTo,
              },
              receiver: emailConfig?.receiver,
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
