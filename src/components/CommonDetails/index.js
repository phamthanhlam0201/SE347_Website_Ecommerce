"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import { addCommentToProduct, getAllComments } from "@/services/comment";
import Notification from "../Notification";
import React, { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { parseISO, format } from 'date-fns';

export default function CommonDetails({ item, cmtitem }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  const [selectedSize, setSelectedSize] = useState(null); // Add
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');

  const [userComment, setUserComment] = useState(""); // update
  const [isCommentFocused, setIsCommentFocused] = useState(false);


  // display comment
  console.log(cmtitem)

  const handleCommentFocus = () => {
    setIsCommentFocused(true);
  };

  function processDateInfo(inputDate) {
    const parsedDate = parseISO(inputDate);
  
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    const dayOfWeek = format(parsedDate, 'EEEE');
  
    return {
      date: formattedDate,
      dayOfWeek: dayOfWeek,
    };
  }
  function renderTime(createdAt) {
    const dateInfo = processDateInfo(createdAt);
    return `${dateInfo.dayOfWeek}, ${dateInfo.date}`;
  }
  async function handleAddComment() {
    try{
      setIsSubmitting(true); // Bắt đầu submit
      console.log("Comment data:", {
        userID: user._id,
        name: user.name,
        productID: item._id,
        cmt: userComment,
      });

      const res = await addCommentToProduct({
        userID: user._id,
        name: user.name,
        productID: item._id,
        cmt: userComment,
      });

      console.log("Response from server:", res);

      if (res.success){
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        setUserComment("");
      }
      else{
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    }
    catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Something went wrong! Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  finally {
    // Ensure that the button is hidden even in case of an error
    setIsSubmitting(false); // Kết thúc submit
  }}

  const handleCommentBlur = () => {
    // Kiểm tra xem có đang trong quá trình submit không
    if (isSubmitting) {
      setIsCommentFocused(false);
      // Thực hiện các bước cần thiết khi blur
    }
  };
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
  // const renderComments = () => {
  //   return (
  //       <div className="container mx-auto px-4 mb-2">
  //         <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
  //           <p className="py-4 text-xl font-bold text-gray-900">Comments</p>
  //         </div>
  //         {Array.isArray(cmtitem) && cmtitem.length > 0 ? (
  //           <ul className="list-disc pl-4">
  //             {cmtitem
  //               .filter(comment => comment.productID === (item && item._id))
  //               .map(filteredComment => (
  //                 <li key={filteredComment._id} className="mb-2">
  //                   <FaUserGroup size={65} className="bg-light-blue text-white mr-2" />
  //                   {filteredComment.cmt}
  //                 </li>
  //               ))}
  //           </ul>
  //         ) : (
  //           <p>No comments available.</p>
  //         )}
  //       </div>
  //   );
  // };
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
      <div className="container mx-auto px-4 border-b border-gray-400">
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
              <div>
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
      </div>
      <div className="container mx-auto px-4 mb-2">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <p className="py-4 text-xl font-bold text-gray-900">Comment</p>
        </div>
        <div className="flex items-center relative">
          <div className="flex-grow">
            <div className="flex items-center mb-2">
              <FaUserGroup size={60} className=" mr-2 rounded-md" />
              <textarea
                value={userComment}
                onChange={(e)=>{
                  setUserComment(String(e.target.value))}}
                onFocus={handleCommentFocus}
                onBlur={handleCommentBlur}
                placeholder="Type your comment here..."
                className={`container px-2 py-2 border ${
                  isCommentFocused ? "border-gray-400" : "border-gray-300"
                } focus:border-gray-400 focus:outline-none transition-all duration-300`}
              />
            </div>
          </div>
          {isCommentFocused && (
            <div className="ml-2">
              <button 
                onClick={handleAddComment}
                className="inline-block px-4 py-2 text-xs font-medium uppercase tracking-wide text-black border border-gray-400 rounded-md font-bold bg-light-blue">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 mb-2">
          {Array.isArray(cmtitem) && cmtitem.length > 0 ? (
            <div>
              {cmtitem
                .filter(comment => comment.productID === (item && item._id))
                .map(filteredComment => (
                  <div key={filteredComment._id} className="flex items-center relative mb-2">
                    <FaUserGroup size={60} className="mr-2" />
                    
                    <p className="container px-2 py-2 border">
                      {filteredComment.name}<br/>
                      {filteredComment.cmt}<br/>
                      {/* code here */}
                      {`Created at: ${renderTime(filteredComment.createdAt)}`}
                      </p>
                  </div>
                ))}
            </div>
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      <Notification/>
    </section>
  );
}
