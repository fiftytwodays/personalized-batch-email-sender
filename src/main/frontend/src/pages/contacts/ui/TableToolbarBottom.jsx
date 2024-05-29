import { Pagination } from "@nextui-org/react";

function TableToolbarBottom({
  page,
  setPage,
  selectedKeys,
  rowsPerPage,
  filteredItems,
}) {
  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

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
    </div>
  );
}

export default TableToolbarBottom;
