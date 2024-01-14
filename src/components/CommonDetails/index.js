"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import Notification from "../Notification";
import React, { useState } from "react";

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  const [selectedSize, setSelectedSize] = useState(null); // Add
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');

  // ColorDropdown component
  const ColorDropdown = ({ availableColors, selectedColor, setSelectedColor }) => {
    return (
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="px-3 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-700"
      >
        {availableColors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.label}
          </option>
        ))}
      </select>
    );
  };

  async function handleAddToCart(getItem) {

    if (!selectedSize) {
      // Handle the case where no size is selected
      toast.error("Please select a size", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id, size: selectedSize, quantity: selectedQuantity, color: selectedColor});

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return (

    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-400">
            Name: {item && item.name}
            </h1>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="py-4 text-sm font-medium text-gray-900"
                  >
                    Category: {item && item.category}
                  </a>
                </nav>
              </div>
            </div>
            <div className="mt-1.5 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0 border-b border-gray-400" >
              <div className="flex items-end">
                <h2
                  className={`text-sm font-medium mr-2 ${
                    item.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  Price: {item && item.price} VNĐ
                </h2>
                {item.onSale === "yes" ? (
                  <h2 className="text-sm font-bold text-red-700 mr-2">{`${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(0)} VNĐ`}</h2>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="mt-1.5 inline-block bg-black px-6 py-3 text-xs font-medium tracking-wide uppercase text-white rounded-md"
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Adding to Cart"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="py-4 text-sm font-medium text-gray-900"
                  >
                    Quantity available: {item && item.deliveryInfo}
                  </a>
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-400 my-4 pb-2">
                <nav className="flex gap-4">
                  <a href="#" className="py-4 text-sm font-medium text-gray-900">
                    Select Size:
                  </a>
                  {item.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      selectedSize === size.id ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {size.label}
                  </button>
                  ))}
                </nav>
              </div>
              {selectedSize && (
                <div className="border-b border-gray-400 pb-2">
                  <nav className="flex gap-4">
                    <span className="py-4 text-sm font-medium text-gray-900">Select Quantity:</span>
                    <input
                      type="number"
                      min="1"
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                      className="px-2 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-700 w-20 "
                    />
                    <span className="py-4 text-sm font-medium text-gray-900">Select Color:</span>
                    <ColorDropdown availableColors={item.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                  </nav>
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="py-4 text-sm font-medium text-gray-900"
                  >
                    Description:
                  </a>
                </nav>
                <pre>{item && item.description}</pre>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* code here */}
        </div>
      </div>
      <Notification/>
    </section>
  );
}
