"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <section className="">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <div className="relative overflow-hidden">
          <img
            src="images/image.png"
            alt="Explore Shop Collection"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left text-dark px-6 lg:px-8 sm:px-4">
            <h2 className="max-w-2xl mb-2 text-xl md:text-4xl xl:text-5xl font-extrabold tracking-tight leading-none">
              Spring Sale Collection
            </h2>
            <p className="max-w-2xl mb-2 font-semibold text-lime-500 md:mb-5 text-xs md:text-lg lg:text-xl">
              Welcome to our store
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/sales")}
              className="inline-block bg-black px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm md:font-medium uppercase tracking-wide text-white "
            >
              Go to STORE
            </button>
          </div>
        </div>
      </div>


        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
              SHOP BY CATEGORY
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRzaGlydHN8ZW58MHx8MHx8fDA%3D"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">T-SHIRTS</h3>
                  <button
                    onClick={() => router.push("/product/listing/t-shirts")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcD22zJWpm8FThK60-nkBpFB5j2e_RkJdijg&usqp=CAU"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">SHIRTS</h3>
                  <button
                    onClick={() => router.push("/product/listing/shirts")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">STORE</h3>
                  <button
                    onClick={() => router.push("/product/listing/all-products")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Explore Shop Collection
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 bg-gray-400">
        <div className="grid grid-cols-12 gap-4">
          {/* Thông tin liên hệ */}
          <div className="col-span-12 lg:col-span-5">
            <div>
              <h3 className="text-xl font-bold text-gray-950 sm:text-xl">CONTACT INFO</h3>
              <p>Phone: 038 651 0050</p>
              <p>Email: phamthanhlam@gmail.com</p>
            </div>
          </div>

          {/* Chính sách hỗ trợ */}
          <div className="col-span-12 lg:col-span-4">
            <div>
              <h3 className="text-xl font-bold text-gray-950 sm:text-xl">SUPPORTING POLICIES</h3>
              <button
                onClick={() => router.push('/')}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                Introduce
              </button>
              <br/>
              <button
                onClick={() => router.push('/')}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                Return policy
              </button>
            </div>
          </div>

          {/* Thông tin liên kết */}
          <div className="col-span-12 lg:col-span-3">
            <div>
              <h3 className="text-xl font-bold text-gray-950 sm:text-xl">LINK INFORMATION</h3>
              <p>Please connect with us:</p>
              {/* Liên kết Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"  // Mở liên kết trong cửa sổ mới
                rel="noopener noreferrer"  // Đề phòng lỗ hổng bảo mật
                className="text-blue-500 hover:underline"
              >
                Facebook Page
              </a>
            </div>
          </div>
        </div>

        </div>
      </section>
    </main>
  );
}
