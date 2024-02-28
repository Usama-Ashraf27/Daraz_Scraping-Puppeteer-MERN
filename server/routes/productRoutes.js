import express from "express";
import { createProductController, getAllProductsController } from "../Controllers/productController.js";

const router = express.Router();

//Product Router

//Create Product Router
router.post("/create", createProductController);

//Get All Products
router.get('/getall', getAllProductsController);


export default router;
