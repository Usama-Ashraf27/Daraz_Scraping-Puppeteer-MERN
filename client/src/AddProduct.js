import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/product/create`, {
        name,
        link,
      });
      // Optionally, you can clear the input fields after adding the product
      setName("");
      setLink("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add Product Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Add Product Link"
        value={link}
        onChange={handleLinkChange}
      />
      <button onClick={handleAddProduct}>Add</button>
    </div>
  );
};

export default AddProduct;
