import { useCallback, useRef } from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { columns } from "../config/columns";
import { capitalize } from "src/utils";
import {
  UploadIcon,
  SearchIcon,
  ChevronDownIcon,
  PlusIcon,
} from "src/components/icons";

export const TableToolbarTop = ({
  contacts,
  openModal,
  setPage,
  setRowsPerPage,
  visibleColumns,
  setVisibleColumns,
  parseContacts,
  filterValue,
  setFilterValue,
}) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      parseContacts(selectedFile);
    }
  };

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, [setPage, setFilterValue]);

  const onSearchChange = (value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  };

  const onRowsPerPageChange = useCallback(
    (e) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  const contactsInputRef = useRef();

  return (
    <div className="flex flex-col gap-4 mt-8 lg:min-w-[600px]">
      <div className="flex justify-between gap-3 items-center">
        <Input
          isClearable
          className="w-full sm:w-2/3"
          size="sm"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown
            portalContainer={document.getElementById("app")}
            type="listbox"
            className="text-foreground"
          >
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            onPress={openModal}
            color="primary"
            className="hidden sm:flex"
            endContent={<PlusIcon />}
          >
            Add New
          </Button>
          <Button
            isIconOnly
            onPress={openModal}
            className="sm:hidden"
            color="primary"
          >
            <PlusIcon />
          </Button>
          <Button
            variant="faded"
            isIconOnly
            color="primary"
            onClick={() => contactsInputRef.current.click()}
          >
            <UploadIcon />
          </Button>
          <input
            type="file"
            ref={contactsInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {contacts?.length} users
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
};
