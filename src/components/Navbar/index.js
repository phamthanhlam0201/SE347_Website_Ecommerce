"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import { RiAccountCircleFill, RiAdminFill, RiLogoutCircleRLine, RiLoginCircleLine } from "react-icons/ri";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`} style={{ backgroundColor: "#73c6d9" }}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  console.log(currentUpdatedProduct, "navbar");

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200" style={{ backgroundColor: "#73c6d9" }}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <img
              src="images/logo.png" // Thay đổi đường dẫn hình ảnh của logo
              alt="Logo"
              className="w-10 h-10" // Điều chỉnh kích thước của logo
            />
            <span className="slef-center sm:text-2xl text-xl font-semibold whitespace-nowrap">
              MEMBERS
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className={
                    "inline-block px-5 py-3 text-xs font-medium upprcase tracking-wide text-red-500"
                  }
                  onClick={()=>router.push('/account')}
                >
                <RiAccountCircleFill size={25} title="Account"/>
                </button>
                <button
                  className={
                    "inline-block px-5 py-3 text-xs font-medium upprcase tracking-wide text-red-500"
                  }
                  onClick={()=> setShowCartModal(true)}
                >
                <BsFillCartPlusFill size={25} title="Cart"/>
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={
                    "inline-block px-5 py-3 text-xs font-medium upprcase tracking-wide text-red-500"
                  }
                  onClick={() => router.push("/")}
                >
                <FaUserGroup size={25} title="Client View"/>
                </button>
              ) : (
                <button
                  onClick={() => router.push("/admin-view")}
                  className={
                    "inline-block px-5 py-3 text-xs font-medium upprcase tracking-wide text-red-500"
                  }
                >
                <RiAdminFill size={25} title="Admin View"/>
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className={
                  "inline-block px-5 py-3 text-xs font-medium upprcase tracking-wide text-red-500"
                }
              >
              <RiLogoutCircleRLine size={25} title="Logout"/>
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className={
                  "inline-block px-5 py-3 text-xs font-medium upprcase tracking-wide text-red-500"
                }
              >
              <RiLoginCircleLine size={25} title="Login"/>
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
