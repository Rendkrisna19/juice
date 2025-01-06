import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getBaseURL } from "../apiConfig";

const ShoppingCart = (props) => {
  const [cartProducts, setCartProducts] = useState(props.cartProducts);
  const [totalPrice, setTotalPrice] = useState(0);
  const customerId = sessionStorage.getItem("customerId");

  useEffect(() => {
    axios
      .get(`${getBaseURL()}api/cart/${customerId}`)
      .then((res) => {
        const productsInCart = res.data;
        setCartProducts(productsInCart);
        calculateTotalPrice(productsInCart);
      })
      .catch((err) => console.log("Error occurred"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cartProducts]);

  const calculateTotalPrice = (products) => {
    const total = products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    setTotalPrice(total);
  };

  const handleRemoveProduct = (productId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      props.removeProduct(productId);
      setCartProducts(cartProducts.filter((product) => product.productId !== productId));
      calculateTotalPrice(cartProducts.filter((product) => product.productId !== productId));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Struk Pembelian", 20, 20);

    doc.setFontSize(12);
    doc.text(`Alamat Pengiriman: ${props.address || "Belum diisi"}`, 20, 30);

    const tableColumn = ["Nama Jus", "Jumlah", "Harga Total (Rp)"];
    const tableRows = cartProducts.map((product) => [
      product.name,
      product.quantity,
      product.quantity * product.price,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    doc.text(`Total Bayar: Rp${totalPrice}`, 20, doc.previousAutoTable.finalY + 10);

    doc.save("struk-pembelian.pdf");
  };

  return (
    <>
      {cartProducts?.length > 0 ? (
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
          <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Nama Jus</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Harga Total</th>
                <th className="py-2 px-4 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((product) => (
                <tr key={product.productId} className="text-center">
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    Rp{product.quantity * product.price}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handleRemoveProduct(product.productId)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full md:w-2/3 mb-4 md:mb-0"
              placeholder="Alamat Pengiriman"
              value={props.address}
              onChange={(e) => props.updateAddress(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              onClick={props.buyProducts}
            >
              Beli
            </button>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              onClick={generatePDF}
            >
              Cetak PDF
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Total Harga: Rp{totalPrice}</h2>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-8">Keranjang belanja kosong</p>
      )}
    </>
  );
};

export default ShoppingCart;
