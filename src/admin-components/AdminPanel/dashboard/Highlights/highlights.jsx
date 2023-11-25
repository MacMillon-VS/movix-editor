import MovieTanTable from "../Videos/MovieTanTable";
import { useAxios, useMutation } from "../../useAxios";
import { useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { DateTime } from "luxon";
import HighlightsTable from "./HighlightsTable";
import Loader from "../../../../utils/Loader";

function Ebtn({ row }) {
  const [isHidden, setIsHidden] = useState(row?.original.is_deleted);
  const { updateMutation } = useMutation();
  console.log({ Outside: isHidden });
  const handleToggle = async () => {
    try {
      setIsHidden((prev) => !prev);

      const data = await updateMutation(
        `${import.meta.env.VITE_BACKEND_URL}/api/video/video/${
          row?.original.video_number
        }`,
        { is_deleted: !isHidden }
      );
    } catch (error) {
      console.error("Error toggling video status:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <Link
            to={`/admin/edit?movieid=${encodeURI(row?.original.video_number)}`}
            className="text-sm font-medium leading-none text-white"
          >
            Edit Subtitle
          </Link>
        </button>
        <button className="mx-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <Link
            to={row.original.video_url}
            target="_blank"
            className="text-sm font-medium leading-none text-white"
          >
            Preview
          </Link>
        </button>
        <button
          onClick={handleToggle}
          className={`text-sm font-medium leading-none text-white mx-4 focus:ring-2 focus:ring-offset-2  mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 ${
            isHidden
              ? "bg-green-700 focus:ring-green-600 hover:bg-green-600"
              : "bg-red-700 focus:ring-red-600 hover:bg-red-600"
          } focus:outline-none rounded`}
        >
          {isHidden ? "Publish" : "Hide"}
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

  return <HighlightsTable data={data?.results} columns={columns} />;
};

export default Highlights;
