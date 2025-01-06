import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import HeroImage from "../../images/bg.jpeg"; // Gambar untuk hero section

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  const addProduct = () => {
    let name = productName;
    let price = productPrice;
    let description = productDesc;
    if (name !== "" && price > 0 && description !== "") {
      axios
        .post(`${getBaseURL()}api/products/create`, { name, price, description })
        .then(() => {
          console.log("Product added");
          fetchProducts();
          setProductName("");
          setProductPrice(0);
          setProductDesc("");
        })
        .catch(() => console.log("Failed to add product"));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openProductDetails = (product) => {
    props.handleProductDetails(product);
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`${getBaseURL()}api/products/delete/${productId}`)
      .then(() => {
        console.log("Deletion successful");
        fetchProducts();
      })
      .catch(() => console.log("Failed to delete product"));
  };

  const fetchProducts = () => {
    axios
      .get(`${getBaseURL()}api/products`)
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch(() => console.log("Couldn't fetch product list"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-gray-900 mt-2">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gray-100 shadow-md">
        <div className="w-full md:w-1/2 text-center md:text-left">
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

      {/* Add Product Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tambahkan Menu jus baru</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="productName" className="block font-medium text-gray-700">
              Nama Jus:
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Name"
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block font-medium text-gray-700">
              Harga:
            </label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Price"
            />
          </div>
          <div>
            <label htmlFor="productDesc" className="block font-medium text-gray-700">
              Deskripsi:
            </label>
            <input
              type="text"
              id="productDesc"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description"
            />
          </div>
        </div>
        <button
          onClick={addProduct}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Tambahkan
        </button>
      </div>

      {/* Product List Section */}
      <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Daftar Jus</h2>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 pb-2">Id</th>
              <th className="border-b-2 pb-2">Nama</th>
              <th className="border-b-2 pb-2">Harga</th>
              <th className="border-b-2 pb-2">Tanggal dibuat</th>
              <th className="border-b-2 pb-2">Detail</th>
              <th className="border-b-2 pb-2">Hapus</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="hover:bg-gray-100">
                <td className="py-2">{product.productId}</td>
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.price}</td>
                <td className="py-2">{product.createdDate}</td>
                <td className="py-2">
                  <button
                    onClick={() => openProductDetails(product)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2">
                  <button
                    onClick={() => deleteProduct(product.productId)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
