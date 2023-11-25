import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MenuLink = ({ item }) => {
  const Location = useLocation();
  const pathname = Location.pathname;

  return (
    <Link
      to={item.path}
      className={` p-2 pr-[100px] hover:bg-indigo-700 pl-5 flex items-center gap-2 mx-1 rounded-lg  ${
        pathname.includes(item.path) && "bg-background_hover"
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
