import { SocialLinks, WebsiteTitle } from "../../constants/Informations";
import { GetTwitterId } from "../../utils/func/getTwitterId";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="text-text body-font bg-background pt-16 xl:pt-32">
      <div className="max-w-screen-2xl w-full px-5  py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className=" text-xl text-text black_ops"><Logo name={WebsiteTitle}/></span>
        </a>
        <p className="text-sm text-text sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 {WebsiteTitle} —
          <a
            href={SocialLinks[0].link}
            className="text-gray-400 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @{GetTwitterId(SocialLinks[0].link)}
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          {SocialLinks.map((social) => {
            const Icon = social.icon
            return(
            <a
              title={social.title}
              className="ml-3 text-2xl text-gray-500 hover:text-accent"
              href={social.link}
              target="_blank"
              key={social.title}
            >
              <Icon/>
            </a>)
          })}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
