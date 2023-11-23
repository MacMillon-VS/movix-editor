import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Modal from "./Modal";
import AddMovieModal from "./AddMovieModal";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Loader from '../../utils/Loader'

export default function MovieTanTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [showModal, setShowModal] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  if (!data) {
    return <Loader/>;
  }
  return (
    <div className="w3-container box-border">
      <div className="flex justify-between ">
        <div className="relative w-1/3 mb-8">
          <input
            type="search"
            placeholder="Search..."
            value={filtering}
            className=" bg-[#2e374a] h-10 px-5 rounded-md outline-none  text-white appearance-none border-none border border-input py-1 text-sm shadow-sm transition-colors  "
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
        <div>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            Modal={<AddMovieModal setShowModal={setShowModal} />}
          >
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">
                Add Movie
              </p>
            </button>
          </Modal>
        </div>
      </div>
      <div className=" shadow-lg  w-full px-4 py-3  text-white rounded-lg bg-background ">
        <table className="w3-table-alldemo w-full  ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-transparent">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className=" text-white text-left py-3 px-2 "
                  >
                    {header.isPlaceholder ? null : (
                      <div className=" flex items-center select-none cursor-pointer gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          {
                            asc: <BiSolidUpArrow />,
                            desc: <BiSolidDownArrow />,
                          }[header.column.getIsSorted() ?? null]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-left py-2 px-2 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
              {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot> */}
        </table>
      </div>
      {table.getRowModel().rows.length <= 0 ? (
        <h2 className="mx-auto text-center text-xl my-5 font-semibold w-full">
          No video Found
        </h2>
      ) : null}
      <div className="flex justify-end mt-3">
        <button
          className="py-3 bg-indigo-700 my-2 mx-4 px-2 text-sm font-medium text-white rounded-md hover:bg-indigo-400 hover:text-black"
          onClick={() => table.setPageIndex(0)}
        >
          First page
        </button>
        <button
          className="py-3 bg-indigo-700 my-2 mx-4 px-2 text-sm font-medium text-white rounded-md hover:bg-indigo-400 hover:text-black disabled:text-white disabled:bg-indigo-950"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous page
        </button>
        <button
          className="py-3 bg-indigo-700 my-2 mx-4 px-2 text-sm font-medium text-white rounded-md hover:bg-indigo-400 hover:text-black disabled:text-white disabled:bg-indigo-950"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page
        </button>
        <button
          className="py-3 bg-indigo-700 my-2 mx-4 px-2 text-sm font-medium text-white rounded-md hover:bg-indigo-400 hover:text-black"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last page
        </button>
      </div>
    </div>
  );
}
