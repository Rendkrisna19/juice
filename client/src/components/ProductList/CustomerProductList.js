import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import ShoppingCart from "../ShopingCart/ShoppingCart";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

// Import gambar produk dan hero section
import ProductImage1 from "../../images/1.jpeg";
import ProductImage2 from "../../images/2.jpeg";
import ProductImage3 from "../../images/3.jpeg";
import ProductImage4 from "../../images/4.jpeg";
import ProductImage5 from "../../images/5.jpeg";
import ProductImage6 from "../../images/6.jpeg";
import ProductImage7 from "../../images/7.jpeg";
import ProductImage8 from "../../images/8.jpeg";
import HeroImage from "../../images/bg.jpeg"; // Gambar untuk hero section
import { FaOptinMonster } from "react-icons/fa6";

const ProductListCustomer = (props) => {
  const [productList, setProductList] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const customerId = sessionStorage.getItem("customerId");
  const [address, setAddress] = useState("");

  const productImages = [ProductImage1, ProductImage2, ProductImage3, ProductImage4, ProductImage5, ProductImage6, ProductImage7, ProductImage8];

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/products`)
      .then((res) => {
        res.data.forEach((product) => {
          product.quantity = 0;
        });
        axios
          .get(`${getBaseURL()}api/cart/${customerId}`)
          .then((responseCart) => {
            let productsInCart = responseCart.data;
            setCartProducts(productsInCart);
            setProductList(res.data);
          })
          .catch((err) => console.log("Error occurred"));
      })
      .catch((err) => console.log("Error"));
  }, []);

  const addToCart = (product) => {
    if (product.quantity > 0) {
      let updatedCartList = [...cartProducts];
      let existingProductIndex = updatedCartList.findIndex(
        (p) => p.productId === product.productId
      );

      if (existingProductIndex !== -1) {
        updatedCartList[existingProductIndex].quantity += product.quantity;
      } else {
        updatedCartList.push({ ...product });
      }

      axios
        .post(`${getBaseURL()}api/cart/add`, {
          customerId,
          productId: product.productId,
          quantity: product.quantity,
          isPresent: existingProductIndex !== -1,
        })
        .then(() => {
          setCartProducts(updatedCartList);
          const updatedProductList = productList.map((p) => ({
            ...p,
            quantity: 0,
          }));
          setProductList(updatedProductList);
        })
        .catch((error) => console.log("Error adding to cart:", error));
    }
  };

  const adjustQuantity = (productId, adjustment) => {
    const updatedList = productList.map((product) => {
      if (product.productId === productId) {
        const newQuantity = product.quantity + adjustment;
        product.quantity = newQuantity < 0 ? 0 : newQuantity;
      }
      return product;
    });
    setProductList(updatedList);
  };

  const buyProducts = () => {
    const token = sessionStorage.getItem("jwt_token");

    if (!token) {
      alert("Authorization token is missing");
      return;
    }

    if (address !== "") {
      const customerPayload = { address };

      axios
        .post(
          `${getBaseURL()}api/cart/buy/${customerId}`,
          { ...customerPayload },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          setCartProducts([]);
          setAddress("");
          alert("Order placed successfully");
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            alert("Authorization failed. Please log in again.");
          } else {
            console.error("Error:", error);
          }
        });
    } else {
      alert("Please enter your address");
    }
  };

  const removeProduct = (productId) => {
    axios
      .delete(`${getBaseURL()}api/cart/remove/${productId}/${customerId}`)
      .then(() => {
        setCartProducts(cartProducts.filter((product) => product.productId !== productId));
      })
      .catch((err) => console.log("Error occurred"));
  };

  const updateAddress = (updatedAddress) => {
    setAddress(updatedAddress);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-100 flex items-center justify-between p-8 md:p-16">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Stay Healthy with Fresh Juice!
          </h1>
          <p className="text-lg text-gray-600">
            Consuming fresh juices daily is one of the best ways to maintain a healthy lifestyle. 
            Explore our wide range of fresh and delicious juices crafted just for you!
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={HeroImage}
            alt="Fresh Juice"
            className="rounded-lg shadow-lg w-full md:w-3/4"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Daftar jus</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.map((product, index) => (
            <div
              key={product.productId}
              className="bg-gray-200 border rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={productImages[index % productImages.length]}
                alt={`Product ${index + 1}`}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">Price: Rp{product.price}</p>
              <div className="flex items-center gap-4 mb-4">
                <button
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                  onClick={() => adjustQuantity(product.productId, -1)}
                >
                  -
                </button>
                <span className="text-lg">{product.quantity}</span>
                <button
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                  onClick={() => adjustQuantity(product.productId, 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <ShoppingCart
          cartProducts={cartProducts}
          removeProduct={removeProduct}
          buyProducts={buyProducts}
          address={props.address}
          updateAddress={updateAddress}
        />
      </div>
      <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Business Info */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">Fresh Juice Co.</h2>
          <p className="text-gray-400">
            Delivering the freshest juices straight to your doorstep.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-6 mb-6 md:mb-0 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Footer Image */}
        {/* <div>
          <img
            src={{ HeroImage }}
            alt="Fresh Juice Logo"
            className="w-24 h-auto"
          />
        </div> */}
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Fresh Juice Co 2025. All rights reserved.
      </div>
    </footer>
    </div>
  );
};

export default ProductListCustomer;
