import MovieTanTable from "./MovieTanTable";
import { useAxios, useMutation } from "../../useAxios";
import { useMemo, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { DateTime } from "luxon";
import EditMovieModal from "./EditMovieModal";
import Modal from "../../Modal";
import { PageConfig } from "../../../../constants/Informations";

function Ebtn({ row }) {
  const [isHidden, setIsHidden] = useState(row?.original.is_deleted);
  const [showModal, setShowModal] = useState(false);
  const { updateMutation } = useMutation();
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
      <div className="flex gap-2 flex-row">
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          Modal={
            <EditMovieModal Movie={row?.original} setShowModal={setShowModal} />
          }
        >
          <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
            {" "}
            Edit Video
          </button>
        </Modal>
        <Link
          to={`/admin/edit?movieid=${encodeURI(row?.original.video_number)}`}
          className="text-sm font-medium leading-none text-white focus:ring-2 justify-center flex items-center focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0  px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
        >
          Edit Subtitles
        </Link>
        {/* <button className="mx-4 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <Link
            to={row.original.video_url}
            target="_blank"
            className="text-sm font-medium leading-none text-white"
          >
            Preview
          </Link>
        </button> */}
        <button
          onClick={handleToggle}
          className={`text-sm font-medium leading-none flex justify-center items-center text-white mx-4 focus:ring-2 focus:ring-offset-2  mt-4 sm:mt-0  px-3 py-3 ${
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

const Videos = () => {
  const [SearchParams] = useSearchParams();
  let page = SearchParams.get("page") || 1;
  let PageSize = SearchParams.get("page_size") || PageConfig.Video_page_size;
  const search = SearchParams.get("search") || "";

  if (!!search) {
    page = 1;
  }
  //
  const { data, loading } = useAxios(
    `https://video-library.blacktievents.in/api/video/video?do_include_deleted=true&search=${encodeURI(
      search
    )}&page=${page}&page_size=${PageSize}
    `
  );
  console.log(data);

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      header: "ID",
      accessorKey: "video_number",
      footer: "ID",
    },

    {
      header: "Video name",
      accessorKey: "video_name",
      footer: "Video name",
    },
    {
      header: "Minister",
      accessorKey: "video_minister",
      footer: "Gender",
    },
    {
      header: "Actions",
      accessorKey: "moviesrc",
      // Cell: ({value})=>(<Link to={this.editRow({value})}>Edit</Link>)
      cell: Ebtn,
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      footer: "Date",
      cell: (info) =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
  ];
  return (
    <MovieTanTable
      data={data?.results}
      totalCount={data?.count}
      columns={columns}
      loading={loading}
    />
  );
};

export default Videos;
