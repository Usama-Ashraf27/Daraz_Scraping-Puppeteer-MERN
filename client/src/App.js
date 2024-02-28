import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts();
  }, [products]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/product/getall`
      );
      setProducts(response.data.data); // Set products to the data array
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Daraz Product Scraping </h1>
      <AddProduct />
      {loading ? (
        <div>Loading...</div>
      ) : (
        products.map(
          (
            product,
            index // Ensure products is an array before mapping
          ) => (
            <div key={index}>
              <h2>Product {index + 1}</h2>
              <ul>
                {Object.entries(product).map(([property, value]) => (
                  <li key={property}>
                    <strong>{property}: </strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )
        )
      )}
    </div>
  );
}

export default App;
