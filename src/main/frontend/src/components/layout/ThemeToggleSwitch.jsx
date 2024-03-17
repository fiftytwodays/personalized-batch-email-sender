import { Switch } from "@nextui-org/react";

import { MoonIcon } from "../icons";
import { SunIcon } from "../icons";

export default function ThemeToggleSwitch({ theme = "light", toggleTheme }) {
  return (
    <Switch
      defaultSelected
      value={theme}
      size="lg"
      onChange={toggleTheme}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    ></Switch>
  );
}
