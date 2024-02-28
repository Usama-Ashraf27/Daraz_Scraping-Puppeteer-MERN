import Mongoose from "mongoose";

const ProductSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name Required"],
  },
  link: {
    type: String,
    required: [true, "Product Link Required"],
  },
});

const Products = Mongoose.model("Product", ProductSchema);

export default Products;
