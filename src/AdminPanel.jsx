// import { Movies } from "../data";
import MovieTanTable from "./admin-components/AdminPanel/MovieTanTable";
// import Sidebar from "./admin-components/AdminPanel/Sidebar";

import { useAxios, useMutation } from "./admin-components/AdminPanel/useAxios";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import Sidebar from "./admin-components/AdminPanel/sidebar/Sidebar.jsx";
import axios from "axios";

function Ebtn({ row }) {
  const [isHidden, setIsHidden] = useState(row?.original.is_deleted);
  const { updateMutation } = useMutation();
console.log({"Outside":isHidden});
  const handleToggle = async () => {
    try {
      setIsHidden(prev=>!prev);
      
      const data = await updateMutation(
        `${import.meta.env.VITE_BACKEND_URL}/api/video/video/${row?.original.video_number}`,
        { is_deleted:!isHidden }
      );
    } catch (error) {
      console.error('Error toggling video status:', error);
    }
  };
  return (
    <>
    <div className="flex flex-row">

      {console.log(row)}
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
      <button onClick={handleToggle} className={`text-sm font-medium leading-none text-white mx-4 focus:ring-2 focus:ring-offset-2  mt-4 sm:mt-0 inline-flex items-start justify-start px-3 py-3 ${isHidden ? "bg-green-700 focus:ring-green-600 hover:bg-green-600":"bg-red-700 focus:ring-red-600 hover:bg-red-600"} focus:outline-none rounded`}>
      
      {isHidden ? 'Publish' : 'Hide'}
      </button>
      {/* <ToggleVideoStatus videoId={row?.original.video_number} isPublished={true} /> */}
    </div>
    </>
  );
  // props.row.original.moviesrc
}

export default function AdminPanel() {
  const { data } = useAxios(
    `https://video-library.blacktievents.in/api/video/video`
  );
  console.log({ data });

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
      // Cell: (object, _unused) => {
      //   const { moviesrc } = object;
      //   return <Link to={moviesrc}>Edit</Link>;
      // },
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
    <>
      <div className="flex  h-screen w-full overflow-hidden bg-gray-200">
        {/* <Sidebar /> */}
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-y-scroll bg-[#111725]">
          <main className="relative mx-6 focus:outline-none ">
            <div className="py-6">
              <div className=" mx-auto 2xl:max-w-[1440px]  ">
                <div className="py-4 text-black w-full ">
                  {/* <Table movies={data?.results} /> */}
                  <MovieTanTable data={data?.results} columns={columns} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}