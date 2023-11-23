import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdVideocam,
} from "react-icons/md";

import { CgProfile } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import MenuLink from "./MenuLink";
import { useAuthUser, useSignOut } from "react-auth-kit";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Videos",
        path: "/",
        icon: <MdVideocam />,
      },
      {
        title: "Profiles",
        path: "/dashboard/profiles",
        icon: <CgProfile />,
      },

      {
        title: "Users",
        path: "/dashboard/user",
        icon: <FiUsers />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const getUserData = useAuthUser();
  const user = getUserData();
  const SignOut = useSignOut();

  return (
    <div className={"sticky top-[40px] bg-background text-slate-300 pl-5 py-3 pr-2"}>
      <div className={"flex items-center gap-2 mb-5  "}>
        <img
          className={"rounded-full aspect-square w-[50px] object-cover"}
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/004/297/837/small/camera-abstract-logo-template-minimal-design-logotype-concept-for-digital-art-studio-photo-studio-photographer-and-photo-editor-app-isolated-on-black-background-vector.jpg"
          }
          alt=""
          width="50"
          height="50"
        />
        {/* <div className=" bg-green-600 w-[50px] h-[50px] rounded-full" /> */}

        <div className={"flex flex-col "}>
          <span className={"font-medium"}>{user.name}</span>
          <span className={"text-xs text-gray-400"}>{user.email}</span>
        </div>
      </div>
      <ul className={"appearance-none list-none"}>
        {menuItems.map((cat) => (
          <li key={cat.title} className=" my-3">
            <span className={" text-white font-bold text-sm mx-2 "}>
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
      <button
        onClick={() => SignOut()}
        className={
          " w-full flex items-center gap-3 hover:bg-background_hover px-2 py-3 rounded-md "
        }
      >
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
