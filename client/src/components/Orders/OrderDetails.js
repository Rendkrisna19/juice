import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";

const OrderDetails = (props) => {
  const orderId = props.orderId;
  const [order, setOrder] = useState({});
  const [productsInOrder, setProductsInOrder] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/orders/${orderId}`)
      .then((res) => {
        setOrder(res.data[0]);
      })
      .catch((err) => console.log("Error fetching order details"));

    axios
      .get(`${getBaseURL()}api/orders/getProductsByOrder/${orderId}`)
      .then((res) => {
        setProductsInOrder(res.data);
      })
      .catch((err) => console.log("Error fetching products in order"));
  }, [orderId]);

  const handleBackClick = () => {
    props.onBackClick(); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-gray-900 p-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBackClick}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
        >
          Kembali
        </button>
      </div>

      {/* Order Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Pesanan</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Order ID
            </label>
            <input
              type="text"
              value={orderId}
              disabled
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nama Customer
            </label>
            <input
              type="text"
              value={order.fname || ""}
              disabled
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Total Harga
            </label>
            <input
              type="text"
              value={order.totalPrice || ""}
              disabled
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tanggal Order
            </label>
            <input
              type="text"
              value={order.createdDate || ""}
              disabled
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Alamat
            </label>
            <input
              type="text"
              value={order.address || ""}
              disabled
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Products in Order Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Produk</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Product ID</th>
                <th className="border border-gray-300 px-4 py-2">Nama Jus</th>
                <th className="border border-gray-300 px-4 py-2">Jumlah</th>
                <th className="border border-gray-300 px-4 py-2">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {productsInOrder.length > 0 ? (
                productsInOrder.map((product) => (
                  <tr
                    key={product.productId}
                    className="hover:bg-gray-100 transition duration-150"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {product.productId}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Rp {product.totalPrice}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    Tidak ada produk dalam pesanan ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
