import { FieldErrors, FieldValues } from "react-hook-form";
import moment from "moment";
import * as cheerio from "cheerio";
import { TRPCError } from "@trpc/server";

const ariaInvalid = <T extends FieldValues>(
  errors: FieldErrors<T>,
  attr: keyof (T & { root: any }),
) => {
  return { "aria-invalid": errors[attr] !== undefined };
};

const IS_SERVER = typeof window === "undefined";
export default function getUrl(path: string) {
  const baseURL = IS_SERVER
    ? process.env.NEXT_PUBLIC_URL!
    : window.location.origin;
  return new URL(path, baseURL);
}

function removeSubdomains(url: string) {
  const parts = url.match(/^(https?:\/\/)?(.*?)(\/|$)/);
  if (parts && parts[2]) {
    const domain = parts[2].split('.').slice(-2).join('.');
    const rest = url.replace(parts[2], domain);
    return rest;
  }
  return url;
}

const copyToClipboard = async (text: string) => {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
};

const plural = (count: number, singular: string, plural?: string) => {
  if (Math.abs(count) <= 1) return singular;
  if (!plural) return singular + "s";
  return plural;
};

const formatDateTime = (date: Date | string) =>
  moment(date).format("YYYY-MM-DD HH:mm:ss [UTC]");

const formatDate = (date: Date | string) => moment(date).format("DD MMM, YYYY");

const formatDatetimeLocalInput = (date: Date | string) =>
  moment(date).format("YYYY-MM-DDTHH:mm");

const getTitleFromURL = async (url: string) => {
  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, 3000);

  var res: Response, content: string;

  try {
    res = await fetch(url);
  } catch (e) {
    if (e instanceof TypeError) {
      throw new TRPCError({ code: "BAD_REQUEST" });
      // TODO: Handle Invalid URL
    }


    return { title: null, url };
  }

  try {
    content = await res.text();
    // console.log(content);
  } catch (e) {
    return { title: null, url };
  }

  const $cheerio = cheerio.load(content);
  const element = $cheerio("title");

  var title: string | null;

  if (element.length != 0) {
    title = element.first().text();
  } else {
    title = null;
  }

  return { title, url: res.url };
};
export {
  ariaInvalid,
  getUrl,
  copyToClipboard,
  formatDateTime,
  formatDate,
  plural,
  formatDatetimeLocalInput,
  getTitleFromURL,
  removeSubdomains
};
