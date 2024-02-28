import express from "express";
import morgan from "morgan";
import cors from "cors";
import Colors from "colors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";

dotenv.config();

ConnectDB();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
import productRoutes from "./routes/productRoutes.js";

app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to  Node Server Ecommerce App</h1>");
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Serrver Running on PORT.... ${process.env.PORT} on ${process.env.NODE_ENV} Mode`
      .bgMagenta.white
  );
});

// import puppeteer from 'puppeteer';

// const scrapeWebsite = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.daraz.pk/products/rgb-7-usb-i440779980-s2173311953.html?spm=a2a0e.home.flashSale.5.35e34076tgmMPM');

//   // Extract data
//   const priceElement = await page.$('.pdp-product-price .pdp-price_type_normal');
//   const discountedPriceElement = await page.$('.pdp-product-price .pdp-price_type_deleted');
//   const discountElement = await page.$('.pdp-product-price__discount');

//   const price = await page.evaluate(priceElement => priceElement.textContent, priceElement);
//   const discountedPrice = await page.evaluate(discountedPriceElement => discountedPriceElement.textContent, discountedPriceElement);
//   const discount = await page.evaluate(discountElement => discountElement.textContent, discountElement);

//   await browser.close();

//   return { price, discountedPrice, discount };
// };

// scrapeWebsite().then(data => {
//   console.log('Price:', data.price);
//   console.log('Discounted Price:', data.discountedPrice);
//   console.log('Discount:', data.discount);
// });
