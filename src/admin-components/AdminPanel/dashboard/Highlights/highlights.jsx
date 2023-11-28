import { useAxios, useMutation } from "../../useAxios";
import { useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { DateTime } from "luxon";
import HighlightsTable from "./HighlightsTable";
import Loader from "../../../../utils/Loader";
import axios from "axios";

function Ebtn({ row }) {
  console.log(row);
  const { deleteMutation, loading } = useMutation();

  async function DeleteHighlight(id) {
    // ${import.meta.env.VITE_BACKEND_URL}/api/video/video-highlights/${id}
    await deleteMutation(
      `${import.meta.env.VITE_BACKEND_URL}/api/video/video-highlights/${id}`
    );
    window.location.reload();
  }

  return (
    <>
      <div className="flex flex-row">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <Link
            tabIndex={-1}
            to={`/admin/edit?movieid=${encodeURI(row?.original.video_id)}`}
            className="text-sm font-medium leading-none text-white"
          >
            Edit Subtitle
          </Link>
        </button>
        <button className="mx-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <Link
            tabIndex={-1}
            to={row.original.video_url}
            target="_blank"
            className="text-sm font-medium leading-none text-white"
          >
            Preview
          </Link>
        </button>

        <button
          onClick={() => DeleteHighlight(row.original.id)}
          className="mx-4 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>

        {/* <ToggleVideoStatus videoId={row?.original.video_number} isPublished={true} /> */}
      </div>
    </>
  );
  // props.row.original.moviesrc
}

const Highlights = () => {
  const { data, loading } = useAxios(
    `https://video-library.blacktievents.in/api/video/video-highlights`
  );
  console.log(data);
  if (loading) {
    return <Loader />;
  }

  console.log({ data });

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: "ID",
      accessorKey: "video_id",
      footer: "ID",
    },

    {
      header: "Video name",
      accessorKey: "highlight_title",
      footer: "Video name",
    },
    {
      header: "Priority",
      accessorKey: "highlight_priority",
    },
    {
      header: "Actions",
      accessorKey: "moviesrc",
      // Cell: ({value})=>(<Link to={this.editRow({value})}>Edit</Link>)
      cell: Ebtn,
      // Cell: (object, _unused) => {
      //   const { moviesrc } = object;
      //   return <Link to={moviesrc}>Edit</Link>;
      // },
    },
  ];

  return <HighlightsTable data={data?.data} columns={columns} />;
};

export default Highlights;
