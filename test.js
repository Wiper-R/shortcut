// @ts-check

const fs = require("fs").promises;
const cheerio = require("cheerio");

(async () => {
  try {
    const res = await fetch(
      "https://www.amazon.in/gp/product/B07YGCNS4R/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1",
    );
    const $cheerio = cheerio.load(await res.text());
    const element = $cheerio("title");
    console.log(element.first().text())
  } catch (error) {
    console.error(
      "Error occurred while fetching or writing data to file:",
      error,
    );
  }
})();
