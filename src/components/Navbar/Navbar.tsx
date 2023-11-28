import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { NavLinks, WebsiteTitle } from "../../constants/Informations";
import Input from "./SearchInput";
import { useState } from "react";

const Navbar = () => {
  const [isopen, setOpen] = useState(false);

  return (
    <header className=" fixed flex justify-center   sm:h-[70px] z-30   w-full items-center xl:top-5 text-text">
      <div className=" max-w-screen-2xl w-full  max-sm:py-4 flex bg-black bg-opacity-50 backdrop-blur-2xl  h-full xl:rounded-full items-center px-5 lg:px-10  justify-between">
        <div className={`${isopen ? "max-md:hidden" : ""}`}>
          <Logo name={WebsiteTitle} />
        </div>

        <ul className=" flex gap-8  justify-center max-md:w-full max-md:justify-end max-md:px-2  items-center ">
          {NavLinks.map((link) => (
            <motion.li
              whileTap={{ scale: 0.9, letterSpacing: 2 }}
              className=" text-lg max-md:hidden "
              key={link.name}
            >
              <NavLink
                to={link.link}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending navLink"
                    : isActive
                    ? "active navLink"
                    : "navLink"
                }
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}

          <Input isopen={isopen} setOpen={setOpen} />
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
