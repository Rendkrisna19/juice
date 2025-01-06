import React, { useState } from "react";
import { FaCartPlus, FaListAlt } from "react-icons/fa"; // Mengimpor ikon dari react-icons
import CustomerProductList from "../ProductList/CustomerProductList";
import CustomerOrders from "./CustomerOrders";
import "./CustomerContainer.scss";

const CustomerContainer = (props) => {
  const [isProductsActive, setIsProductsActive] = useState(true);

  const changeList = () => {
    setIsProductsActive(!isProductsActive);
  };

  return (
    <div className="customer-container">
      <div>
        {isProductsActive ? (
          <>
            <button
              onClick={changeList}
              className="btn btn-toggle"
            >
              <FaListAlt className="mr-2" /> Lihat Pesanan Saya
            </button>
            <div className="list-container">
              <CustomerProductList />
            </div>
          </>
        ) : (
          <>
            <button
              onClick={changeList}
              className="btn btn-toggle"
            >
              <FaCartPlus className="mr-2" /> List Menu Jus
            </button>
            <div className="list-container">
              <CustomerOrders />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerContainer;
