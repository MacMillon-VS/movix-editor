import {BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoTwitter} from 'react-icons/bi' 

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


export const WebsiteTitle = 'Movix' as const

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
] as const

