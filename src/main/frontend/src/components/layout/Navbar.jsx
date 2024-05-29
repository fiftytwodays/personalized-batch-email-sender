import { useState } from "react";
import {
  Navbar as _Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import ThemeToggleSwitch from "./ThemeToggleSwitch";
import { SendIcon } from "../icons";

export default function Navbar({ toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <_Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex w-max justify-center gap-4">
          <SendIcon className="w-6 h-6 text-foreground" />
          <h4 className="font-bold text-foreground w-44">Batch email sender</h4>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem className="hidden lg:flex">
          <ThemeToggleSwitch toggleTheme={toggleTheme} />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <div className="flex w-full mt-4 justify-between">
            <h5>Toggle Theme</h5>
            <ThemeToggleSwitch toggleTheme={toggleTheme} />
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </_Navbar>
  );
}
