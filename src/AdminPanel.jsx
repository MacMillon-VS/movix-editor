// import { Movies } from "../data";

import { useEffectOnce } from "react-use";
import Sidebar from "./admin-components/AdminPanel/sidebar/Sidebar.jsx";

import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAxios } from "./admin-components/AdminPanel/useAxios.jsx";
import { useEffect } from "react";
import { getCookie } from "./config.ts";
import { useAuthHeader, useSignOut } from "react-auth-kit";
export default function AdminPanel() {
  const signout = useSignOut();
  const tokenfn = useAuthHeader();
  const token = tokenfn();
  useEffectOnce(() => {
    AccessCheck(token)
      .then((val) => {
        if (!val) {
          signout();
        }
      })
      .catch((error) => {
        signout();
      });
  }, []);

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

async function AccessCheck(authToken) {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/access-check`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    if (data.status === "403") {
      return false;
    } else return true;
  } catch (error) {
    return false;
  }
}
