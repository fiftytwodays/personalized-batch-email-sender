import { useState, useCallback, useMemo, useRef } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";

import { VerticalDotsIcon } from "src/components/icons";
import { TableToolbarTop } from "./TableToolbarTop";
import TableToolbarBottom from "./TableToolbarBottom";
import AddContactModal from "./AddContactModal";
import { columns } from "../config/columns";

const INITIAL_VISIBLE_COLUMNS = ["name", "prefix", "phoneNo", "actions"];

function ContactsTable({
  contacts,
  addContact,
  updateContact,
  deleteContact,
  parseContacts,
}) {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [currentUpdatingContact, setCurrentUpdatingContact] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = contacts ? [...contacts] : [];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [filterValue, hasSearchFilter, contacts]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const tableRef = useRef();
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
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

  return (
    <div ref={tableRef} className="max-w-sm md:max-w-7xl sm:max-w-lg">
      <Table
        aria-label="Contacts table"
        isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
          tbody: "text-foreground",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        topContent={
          <TableToolbarTop
            contacts={contacts}
            openModal={onOpenChange}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            parseContacts={parseContacts}
          />
        }
        bottomContent={
          <TableToolbarBottom
            page={page}
            setPage={setPage}
            selectedKeys={selectedKeys}
            rowsPerPage={rowsPerPage}
            filteredItems={filteredItems}
          />
        }
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
        <TableBody
          className=""
          emptyContent={"No users found"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.serialNo}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddContactModal
        key={currentUpdatingContact?.name}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        contact={currentUpdatingContact}
        setContact={setCurrentUpdatingContact}
        addContact={addContact}
        updateContact={updateContact}
      />
    </div>
  );
}

export default ContactsTable;
