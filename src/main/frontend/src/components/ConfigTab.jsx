import { Tabs, Tab } from "@nextui-org/react";
import { SettingsIcon, EmailIcon, UsersIcon } from "./icons";
export default function ConfigTab() {
  return (
    <div className="flex justify-center">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <SettingsIcon />
              <span>Configurations</span>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <EmailIcon />
              <span>Email Body</span>
            </div>
          }
        />
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <UsersIcon />
              <span>Contacts</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
}
