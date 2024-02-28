import puppeteer from "puppeteer";
import Products from "../Models/productModel.js";

// Define the createProductController function
export const createProductController = async (req, res) => {
  try {
    const { name, link } = req.body;

    // Validation
    if (!name || !link) {
      return res.status(400).json({
        success: false,
        message: "Please provide a product name and link",
      });
    }

    // Create a new product
    const product = await Products.create({ name, link });

    // Respond with success message
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get all products
export const getAllProductsController = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Products.find();

    // Perform Puppeteer scraping for each product
    const scrapedData = [];
    for (const product of products) {
      const data = await scrapeProduct(product.link); // Scrape each product's webpage
      scrapedData.push({ ...product.toObject(), ...data }); // Merge product data with scraped data
    }

    // Send the products with scraped data as a response
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully with scraped data",
      data: scrapedData,
      length: scrapedData.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const scrapeProduct = async (productLink) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(productLink);

  // Extract data
  const priceElement = await page.$(
    ".pdp-product-price .pdp-price_type_normal"
  );
  const discountedPriceElement = await page.$(
    ".pdp-product-price .pdp-price_type_deleted"
  );
  const discountElement = await page.$(".pdp-product-price__discount");

  const price = await page.evaluate(
    (priceElement) => priceElement.textContent,
    priceElement
  );
  const discountedPrice = await page.evaluate(
    (discountedPriceElement) => discountedPriceElement.textContent,
    discountedPriceElement
  );
  const discount = await page.evaluate(
    (discountElement) => discountElement.textContent,
    discountElement
  );

  await browser.close();

  return { price, discountedPrice, discount };
};
