import {
  Navbar as _Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import ThemeToggleSwitch from "./ThemeToggleSwitch";
import { SendIcon } from "../icons";

export default function Navbar({ toggleTheme }) {
  return (
    <_Navbar>
      <NavbarContent>
        <NavbarBrand className="flex gap-4">
          <SendIcon className="w-6 h-6 text-foreground" />
          <h4 className="font-bold text-foreground">Batch email sender</h4>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <ThemeToggleSwitch toggleTheme={toggleTheme} />
        </NavbarItem>
      </NavbarContent>
    </_Navbar>
  );
}
