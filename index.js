const puppeteer = require("puppeteer");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const ProductsModel = require("./models/ProductsModel");
const ProductsRoutes = require("./routes/productsRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
app.use(cors());
app.use("/api", ProductsRoutes);

const bool = false;

const multimediaUrl = "https://www.expat-dakar.com/multimedia?page=5";
const vehiculesUrl = "https://www.expat-dakar.com/vehicules?page=5";
const maisonUrl = "https://www.expat-dakar.com/maison?page=5";
const immobilierUrl = "https://www.expat-dakar.com/immobilier?page=5";
const annoncesUrl = "https://www.expat-dakar.com/annonces?page=5";
const modebeauteUrl = "https://www.expat-dakar.com/mode-beaute?page=5";
const sportsloisirsUrl =
  "https://www.expat-dakar.com/sport-loisirs-voyages?page=5";
const agroUrl = "https://www.expat-dakar.com/agroalimentaire?page=5";
const animauxUrl = "https://www.expat-dakar.com/animaux?page=5";
let urls = [
  multimediaUrl,
  vehiculesUrl,
  maisonUrl,
  immobilierUrl,
  annoncesUrl,
  modebeauteUrl,
  sportsloisirsUrl,
  agroUrl,
  animauxUrl,
];
if (bool) {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    for (let i = 0; i < urls.length; i++) {
      await page.goto(urls[i], { waitUntil: "networkidle2" });

      let result = await page.evaluate(() => {
        let elements = document.querySelectorAll(".listing-card");

        let data = [];
        // await page.waitForNavigation()
        for (let element of elements) {
          data.push({
            id: element?.querySelector(".listing-card__inner")?.dataset
              ?.tListing_id,
            imageUrl: element?.querySelector(".listing-card__image__resource")
              ?.src,
            title: element?.querySelector(".listing-card__header__title")
              ?.innerText,
            status: element?.querySelector(
              ".listing-card__header__tags__item--condition_new"
            )?.innerText,
            location: element?.querySelector(".listing-card__header__location")
              ?.innerText,
            avatar: element?.querySelector(".avatar__img")?.src,
            price: element?.querySelector(".listing-card__price__value")
              ?.innerText,
            date: new Date().getTime(),
            link: element?.querySelector(".listing-card__inner")?.href,
            currency: element?.querySelector(".listing-card__inner")?.dataset
              ?.tListing_currency,
            priority: element?.querySelector(".listing-priority__title")
              ?.innerText,
            category: element?.querySelector(".listing-card__inner")?.dataset
              ?.tListing_category_title,
          });
        }
        return data;
      });

      ProductsModel.insertMany(result);
      console.log(result);
    }

    await browser.close();
  })();
}

app.listen(PORT, () => console.log(`server listenning on port ${PORT}`));
