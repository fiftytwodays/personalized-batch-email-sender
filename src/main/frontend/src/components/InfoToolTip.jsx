import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { InfoIcon } from "./icons";

function InfoToolTip({ content = "", showTitle = false, title = "" }) {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button className="h-4 w-4" size="sm" variant="light" isIconOnly>
          <InfoIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          {showTitle && <div className="text-small font-bold">{title}</div>}
          <div className="text-tiny">{content}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default InfoToolTip;
