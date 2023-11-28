export const getCookie = (name: string) =>
  document.cookie
    .split("; ")
    .map((cookie) => cookie.split("="))
    .find(([key, _]) => key === name)?.[1];

export const AUTH_KEY = getCookie("_auth");
