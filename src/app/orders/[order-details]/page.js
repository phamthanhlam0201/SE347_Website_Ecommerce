"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function OrderDetails() {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    orderDetails,
    setOrderDetails,
    user,
  } = useContext(GlobalContext);

  const params = useParams();
  const router = useRouter()

  async function extractOrderDetails() {
    setPageLevelLoader(true);

    const res = await getOrderDetails(params["order-details"]);

    if (res.success) {
      setPageLevelLoader(false);
      setOrderDetails(res.data);
    } else {
      setPageLevelLoader(false);
    }

    console.log(res);
  }

  useEffect(() => {
    extractOrderDetails();
  }, []);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="py-14 px-4 md:px-6">
      <div className="flex justify-start items-start space-y-2 flex-col">
        <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-900">
          Order #{orderDetails && orderDetails._id}
        </h1>
        <p className="text-base font-medium leadong-6 text-gray-600">
          {orderDetails &&
            orderDetails.createdAt &&
            orderDetails.createdAt.split("T")[0]}{" "}
          |{" "}
          {orderDetails &&
            orderDetails.createdAt &&
            orderDetails.createdAt.split("T")[1].split(".")[0]}
        </p>
      </div>
      <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:p-6 xl:p-8 w-full">
            <p className="font-bol text-xl font-semibold">Your order summary</p>
            {orderDetails &&
            orderDetails.orderItems &&
            orderDetails.orderItems.length
              ? orderDetails.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                  >
                    <div className="pb-4 md:pb-8 w-full md:w-40 sm:w-full sm:flex-shrink-0">
                      <img
                        src={item && item.product && item.product.imageUrl}
                        alt="Product image"
                        className="h-32 w-32 lg:h-40 lg:w-40  max-w-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between sm:col-gap-5 sm:grid sm:grid-cols-2 mb-2">
                      {/* <div className="sm:col-gap-5 sm:grid sm:grid-cols-2 mb-2"> */}
                        <div className="pr-8 sm:pr-4">
                          <h5 className="text-base text-gray-900">
                            Name: {item && item.product && item.product.name}
                          </h5>
                          <h5 className="text-base text-gray-900">
                            Category: {item && item.product && item.product.category}
                          </h5>
                          <h5 className="text-base text-gray-900">
                            PriceDrop: {item && item.product && item.product.priceDrop} %
                          </h5>
                          <h5 className="text-base text-gray-900">
                            Size: {item && item.size}
                          </h5>
                          <h5 className="text-base text-gray-900">
                            Qtys: {item && item.qtys}
                          </h5>
                          <h5 className="text-base text-gray-900 mb-5">
                            Color: {item && item.color}
                          </h5>
                        </div>
                        <div className="flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                          <p className="shrink-0 w-25 text-base text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                          Price: {item && item.product && item.product.price} VNĐ
                          </p>
                        </div>
                      {/* </div> */}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base leading-5 text-gray-800">Subtotal</p>
                  <p className="text-base leading-5 text-gray-900">
                    {orderDetails && orderDetails.totalPrice} VNĐ
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-base leading-5 text-gray-800">Shipping</p>
                  <p className="text-base leading-5 text-gray-900">Free</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-base leading-5 text-gray-800">Subtotal</p>
                  <p className="text-base leading-5 text-gray-900">
                    {orderDetails && orderDetails.totalPrice} VNĐ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-gray-50 w-full xl:w-96 flex  items-center md:items-start px-4 py-6 flex-col">
            <h3 className="text-xl font-semibold leading-6 text-gray-900">
              Customer Details
            </h3>
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex gap-4 justify-center flex-col w-full md:justify-start   py-8 border-b border-gray-200">
                <p className="text-base leading-4 text-left text-gray-950">
                  Name: {user?.name}
                </p>
                <p className="text-base leading-4 text-left text-gray-950">
                  Email: {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-row items-center md:items-start ">
              <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                <p className="font-semibold text-xl">Shipping Address</p>
                <p>
                  Address :{" "}
                  {orderDetails && orderDetails.shippingAddress.address}
                </p>
                <p>City :{orderDetails && orderDetails.shippingAddress.city}</p>
                <p>
                  Country :{" "}
                  {orderDetails && orderDetails.shippingAddress.country}
                </p>
                <p>
                  Phone Number :{" "}
                  {orderDetails && orderDetails.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push(`/`)}
            className="mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Shop Again
          </button>
        </div>
      </div>
    </div>
  );
}
