import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";

const AdminOrderList = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/orders`)
      .then((res) => {
        const data = res.data;
        setOrders(data);
      })
      .catch((err) => console.log("Couldn't receive order list"));
  }, []);

  const openOrderDetails = (order) => {
    props.handleOrderDetails(order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 text-gray-900">
      {/* Header Section */}
      <div className="py-8 bg-white shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Daftar Pesanan Customer
        </h1>
        <p className="text-center text-gray-600 mt-2">
         Pesanan Yang sudah dibuat oleh customer
        </p>
      </div>

      {/* Orders Table */}
      <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Daftar Pesanan</h2>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 pb-2">Id</th>
              <th className="border-b-2 pb-2">Nama Customer</th>
              <th className="border-b-2 pb-2">Tanggal Order</th>
              <th className="border-b-2 pb-2">Total Harga</th>
              <th className="border-b-2 pb-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-2">{order.orderId}</td>
                  <td className="py-2">{order.fname}</td>
                  <td className="py-2">{order.createdDate}</td>
                  <td className="py-2">Rp {order.totalPrice}</td>
                  <td className="py-2">
                    <button
                      onClick={() => openOrderDetails(order)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada pesanan yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderList;
