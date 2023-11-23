import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { NavLinks, WebsiteTitle } from "../../constants/Informations";
import Input from "./SearchInput";

const Navbar = () => {
  return (
    <header className=" fixed flex justify-center h-[70px] z-30   w-full items-center xl:top-5 text-text">
      <div className=" max-w-screen-2xl w-full flex bg-black bg-opacity-50 backdrop-blur-2xl  h-full xl:rounded-full items-center px-5 lg:px-10  justify-between">
        {/* <Link to={'/'} className=" text-xl black_ops select-none">Movi<span className=" text-accent black_ops">x</span></Link> */}
        <Logo name={WebsiteTitle} />
        <ul className=" flex gap-8 justify-center items-center ">
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
          <Input />
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
