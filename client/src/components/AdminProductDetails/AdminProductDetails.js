import React, { useEffect, useState } from "react";
import axios from "axios";
import OrdersByProductId from "../Orders/OrdersByProductId";
import { getBaseURL } from "../apiConfig";

const ProductDetails = (props) => {
  const [productDetails, setProductDetails] = useState(true);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/products/${props.productId}`)
      .then((res) => {
        const data = res.data;
        setProductName(data[0].name);
        setProductPrice(data[0].price);
        setProductDesc(data[0].description);
        setProductDetails(true);
      })
      .catch(() => {
        console.log("Sorry couldn't fetch details");
        setProductDetails(false);
      });
  }, [props.productId]);

  const saveProduct = () => {
    const productData = {
      id: props.productId,
      name: productName,
      price: productPrice,
      description: productDesc,
    };
    axios
      .post(`${getBaseURL()}api/products/update`, { ...productData })
      .then(() => {
        console.log("Product updated successfully");
      });
  };

  const handleBackClickToProductList = () => {
    props.onBackClick();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-6">
      <div className="w-full max-w-2xl bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
          <button
            onClick={handleBackClickToProductList}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Back
          </button>
        </div>
        {productDetails ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product ID
              </label>
              <input
                type="text"
                value={props.productId}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Price
              </label>
              <input
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Product Description
              </label>
              <textarea
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                rows="4"
              ></textarea>
            </div>
            <button
              onClick={saveProduct}
              className="w-full py-2 text-white font-bold bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
            >
              Save Product
            </button>
          </>
        ) : (
          <p className="text-red-500">Failed to load product details.</p>
        )}
      </div>
      <div className="w-full max-w-2xl mt-6">
        <OrdersByProductId productId={props.productId} />
      </div>
    </div>
  );
};

export default ProductDetails;
