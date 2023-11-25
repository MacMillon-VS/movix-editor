// import { Movies } from "../data";
import MovieTanTable from "./admin-components/AdminPanel/dashboard/Videos/MovieTanTable.jsx";

import Sidebar from "./admin-components/AdminPanel/sidebar/Sidebar.jsx";
import axios from "axios";
import Videos from "./admin-components/AdminPanel/dashboard/Videos/Videos.jsx";
import { Outlet } from "react-router-dom";

export default function AdminPanel() {
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
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
