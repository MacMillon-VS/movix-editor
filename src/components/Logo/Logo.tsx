import { Link } from "react-router-dom";

const Logo = ({ name }: { name: string }) => {
  const characters = name.split('');

  return (
    <Link to={'/'} className="text-2xl black_ops flex select-none">
      {characters.map((char, index) => (
        <span key={index} className={`${index+1 === characters.length ? 'text-accent':'text-text'} transition-all black_ops hover:text-accent hover:mt-2`}>{char}</span>
      ))}
    </Link>
  );
};

export default Logo;
