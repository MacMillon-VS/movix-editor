import React from "react";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
import { TbPhotoShield } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuthHeader, useAuthUser, useSignOut } from "react-auth-kit";
import UserProfile from "./UserProfile";

export default function Sidebar() {
  const Signout = useSignOut();

  return (
    <nav className="flex flex-col justify-between w-20 bg-gray-700 border-r">
      <div className="mt-10 mb-10">
        <div className="w-full flex justify-center items-center">
          <UserProfile />
        </div>

        <div className="mt-10">
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-white transition duration-200 ease-in-out transform hover:text-pink-600 focus:shadow-outline hover:scale-95"
              >
                <p className="mx-auto text-center">
                  <BiHomeAlt2 className="w-5 h-5 mx-auto md hydrated  " />
                  <span className="sr-only">home</span>
                </p>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
              >
                <p className="mx-auto text-center">
                  <IoIosNotificationsOutline className="w-7 h-7 mx-auto md hydrated " />
                  <span className="sr-only">Notifications</span>
                </p>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
              >
                <p className="mx-auto text-center">
                  <ion-icon
                    className="w-5 h-5 mx-auto md hydrated"
                    name="people-outline"
                    role="img"
                    aria-label="people outline"
                  ></ion-icon>
                  <span className="sr-only">account</span>
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <a
          href="#"
          className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
        >
          <p
            className="mx-auto text-center"
            onClick={() => {
              Signout();
            }}
          >
            <BiLogOut
              className="w-5 h-5 mx-auto md hydrated"
              name="log-out-outline"
              role="img"
              aria-label="log out outline"
            ></BiLogOut>
            <span className="sr-only">logout</span>
          </p>
        </a>
      </div>
    </nav>
  );
}
