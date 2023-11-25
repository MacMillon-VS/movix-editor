import { Link } from "react-router-dom";

const Logo = ({ name }: { name: string }) => {
  const characters = name.split("");

  return (
    <Link to={"/"} className="text-2xl black_ops flex select-none">
      <span
        className={`
           text-text
         transition-all black_ops hover:text-accent hover:mt-2`}
      >
        {characters[0]}
      </span>

      {characters.slice(1).map((char, index) => (
        <span
          key={index}
          className={`${
            index === characters.length - 2 ? "text-accent" : "text-text"
          } transition-all black_ops hover:text-accent max-sm:hidden hover:mt-2`}
        >
          {char}
        </span>
      ))}
    </Link>
  );
};

export default Logo;
