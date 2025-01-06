import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import HeroImage from "../../images/bg.jpeg"; // Gambar untuk hero section

const CustomerOrders = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const customerId = sessionStorage.getItem("customerId");

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/orders/myPastOrders/${customerId}`)
      .then((res) => {
        setPastOrders(res.data);
      })
      .catch(() => {
        console.error("Error fetching orders");
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Your Order History
            </h1>
            <p className="text-lg lg:text-xl">
              Keep track of your healthy juice orders. Review past purchases and
              continue your journey towards a healthier lifestyle.
            </p>
          </div>
          <div>
            <img
              src={HeroImage}
              alt="Healthy Juice"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Orders
        </h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Juice Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Total Price (Rp)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pastOrders.length > 0 ? (
                pastOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.totalPrice}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No orders found.
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

export default CustomerOrders;
