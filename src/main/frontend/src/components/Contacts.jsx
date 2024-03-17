import React, { useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import {
  PlusIcon,
  VerticalDotsIcon,
  SearchIcon,
  ChevronDownIcon,
  UploadIcon,
} from "./icons";
import { columns } from "../lib/contacts-table-data";
import { capitalize } from "../utils";
import UpdateContact from "./UpdateContact";

const INITIAL_VISIBLE_COLUMNS = ["name", "prefix", "phoneNo", "actions"];

export default function Contacts({
  parseContacts,
  contacts,
  updateOrAddContact,
  deleteContact,
}) {
  const [currentUpdatingContact, setCurrentUpdatingContact] = useState(null);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [page, setPage] = React.useState(1);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const contactsInputRef = useRef();
  const hasSearchFilter = Boolean(filterValue);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      parseContacts(selectedFile);
    }
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = contacts ? [...contacts] : [];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [filterValue, hasSearchFilter, contacts]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny text-default-400">
                {user.email}
              </p>
            </div>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.team}
              </p>
            </div>
          );
        case "prefix":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.nickName}
              </p>
            </div>
          );

        case "phoneNo":
          return (
            <div className="flex">
              <p>{cellValue || "---"}</p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown
                type="listbox"
                portalContainer={document.getElementById("app")}
                className="text-foreground"
              >
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="menu">
                  <DropdownItem
                    onClick={() => {
                      setCurrentUpdatingContact(user);
                      onOpen();
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      deleteContact(user?.serialNo);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deleteContact, onOpen]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = (value) => {
    if (value) {
      setFilterValue(value);
      // setPage(1);
    } else {
      setFilterValue("");
    }
  };

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const TopContent = () => {
    return (
      <div className="flex flex-col gap-4 mt-8 lg:min-w-[600px]">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            size="sm"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            autoFocus
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
            <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
              Add New
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

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <>
      <UpdateContact
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        contacts={contacts}
        updateContact={updateOrAddContact}
        defaultContactForm={currentUpdatingContact}
        setDefaultContactForm={setCurrentUpdatingContact}
      />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
          tbody: "text-foreground",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={<TopContent />}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.serialNo}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
