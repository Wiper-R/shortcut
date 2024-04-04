import { generateRandomSlug } from "@/lib/utils";
import { hashPassword } from "@/lib/hash-password";
import { PrismaClient, User } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { customAlphabet } from "nanoid";
// import * as cheerio from "cheerio";

const getTitleFromURL = async (url: string): Promise<string | null> => {
  // let res: AxiosResponse<any, any>;

  // try {
  //   res = await axios(url, { timeout: 3000 });
  // } catch (e) {
  //   return null;
  // }

  // try {
  //   const $cheerio = cheerio.load(res.data);
  //   const element = $cheerio("title");

  //   if (element.length != 0) {
  //     return element.first().text();
  //   } else {
  //     return null;
  //   }
  // } catch (e) {
  //   return null;
  // }
  return null;
};

const links = [
  "https://www.wikipedia.org",
  "https://www.github.com",
  "https://www.example.com",
  "https://www.stackoverflow.com",
  "https://www.reddit.com",
  "https://www.linkedin.com",
  "https://www.nytimes.com",
  "https://www.amazon.com",
  "https://www.twitter.com",
  "https://www.youtube.com",
  "https://www.apple.com",
  "https://www.microsoft.com",
  "https://www.ibm.com",
  "https://www.nike.com",
  "https://www.adidas.com",
  "https://www.cnn.com",
  "https://www.bbc.com",
  "https://www.spotify.com",
  "https://www.netflix.com",
  "https://www.instagram.com",
  "https://www.facebook.com",
  "https://www.pinterest.com",
  "https://www.ebay.com",
  "https://www.etsy.com",
  "https://www.target.com",
  "https://www.walmart.com",
  "https://www.bestbuy.com",
  "https://www.weather.com",
  "https://www.tripadvisor.com",
  "https://www.expedia.com",
  "https://www.zillow.com",
  "https://www.realtor.com",
  "https://www.bankofamerica.com",
  "https://www.chase.com",
  "https://www.wellsfargo.com",
  "https://www.citibank.com",
  "https://www.americanexpress.com",
  "https://www.hulu.com",
  "https://www.disneyplus.com",
  "https://www.npr.org",
  "https://www.bloomberg.com",
  "https://www.forbes.com",
  "https://www.techcrunch.com",
  "https://www.wired.com",
  "https://www.nationalgeographic.com",
  "https://www.nasa.gov",
  "https://www.ted.com",
  "https://www.quora.com",
  "https://www.stackexchange.com",
  "https://www.medium.com",
  "https://www.washingtonpost.com",
  "https://www.usatoday.com",
  "https://www.theverge.com",
  "https://www.engadget.com",
  "https://www.cnbc.com",
  "https://www.businessinsider.com",
  "https://www.entrepreneur.com",
  "https://www.fastcompany.com",
  "https://www.huffpost.com",
  "https://www.cnet.com",
  "https://www.techradar.com",
  "https://www.gizmodo.com",
  "https://www.arstechnica.com",
  "https://www.tomsguide.com",
  "https://www.pcworld.com",
  "https://www.macworld.com",
  "https://www.androidauthority.com",
  "https://www.iosdevweekly.com",
  "https://www.smashingmagazine.com",
  "https://www.css-tricks.com",
  "https://www.reactjs.org",
  "https://www.angular.io",
  "https://www.vuejs.org",
  "https://www.nodejs.org",
  "https://www.python.org",
  "https://www.ruby-lang.org",
  "https://www.scala-lang.org",
  "https://www.kotlinlang.org",
  "https://www.php.net",
  "https://www.mysql.com",
  "https://www.postgresql.org",
  "https://www.mongodb.com",
  "https://www.redis.io",
  "https://www.elastic.co",
  "https://www.docker.com",
  "https://www.kubernetes.io",
  "https://www.jenkins.io",
  "https://www.travis-ci.org",
  "https://www.sonarqube.org",
  "https://www.jetbrains.com",
  "https://www.eclipse.org",
  "https://www.visualstudio.microsoft.com",
];

const prisma = new PrismaClient();

async function populateUser() {
  const email = "rshivang12345@gmail.com";
  const password = await hashPassword("password");
  return await prisma.user.upsert({
    where: { email },
    create: {
      email,
      password,
      name: "Shivang Rathore",
    },
    update: {},
  });
}

async function populateLinks(user: User) {
  const data = [];
  for (const dest of links) {
    const title = await getTitleFromURL(dest);
    const slug = generateRandomSlug();
    data.push({
      destination: dest,
      slug,
      url: dest,
      title,
      userId: user.id,
    });
  }
  await prisma.shortenLink.createMany({
    data,
  });
}

async function main() {
  const user = await populateUser();
  await populateLinks(user);

  console.log("Seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
