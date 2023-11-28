import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
} from "react-icons/bi";

//Replace Your Links
export const SocialLinks = [
  {
    title: "twitter",
    icon: BiLogoTwitter,
    link: "https://twitter.com/DiwanshuMd", // Change the Link According to your Account
  },
  {
    title: "facebook",
    icon: BiLogoFacebook,
    link: "https://twitter.com/home",
  },
  {
    title: "instagram",
    icon: BiLogoInstagram,
    link: "https://twitter.com/home",
  },
  {
    title: "linkedin",
    icon: BiLogoLinkedin,
    link: "https://twitter.com/home",
  },
] as const;

export const WebsiteTitle = "Movix" as const;

export const NavLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Movies",
    link: "/movies",
  },
  {
    name: "New",
    link: "/new",
  },
] as const;

export const Passwordconfig = {
  minLength: 8,
  maxLength: 20,
  upperCase: true,
  lowerCase: true,
  numbers: true,
  specialChar: true,
};

export const PageConfig = {
  Video_page_size: 10,
};

export const thumbnail = `${
  import.meta.env.VITE_BACKEND_URL
}/api/user_data/thumbnails/thumbnail.png`;
