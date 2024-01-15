

"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState, useRef} from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import { RiAccountCircleFill, RiAdminFill, RiLogoutCircleRLine, RiLoginCircleLine } from "react-icons/ri";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";

function NavItems({ isModalView = false, isAdminView, router, closeNavbar }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategoryMouseEnter = () => {
    setIsCategoryOpen(true);
    clearTimeout(closeTimeoutRef.current);
  };

  const handleCategoryMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const options = isAdminView ? adminNavOptions : navOptions;

  return (
    <div
      className={`items-center justify-between w-1/2 md:w-full md:flex md:w-auto ${
        isModalView ? '' : 'hidden'
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 items-center ml-8 ${
          isModalView ? 'border-none' : 'border border-gray-100'
        }`}
        // style={{ backgroundColor: '#73c6d9' }}
      >
        {options.map((item) => (
          <li key={item.id} className="relative group">
            <div
              className={`cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 ${
                item.id === 'category' ? 'hover:bg-gray-200' : ''
              }`}
              onClick={() => {
                if (item.id === 'category') {
                  handleCategoryClick();
                } else {
                  router.push(item.path);
                  closeNavbar(); // Close navbar on item click
                }
              }}
              onMouseEnter={item.id === 'category' ? handleCategoryMouseEnter : null}
            >
              {item.label}
            </div>
            {item.subItems && (
              <ul
                className={`${
                  isCategoryOpen ? 'block' : 'hidden'
                } absolute left-0 mt-2 space-y-2 bg-white text-gray-900 border border-gray-100 rounded-md w-[100px]`}
                style={{ zIndex: 10 }}
                onMouseLeave={handleCategoryMouseLeave}
              >
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem.id}
                    className="cursor-pointer block px-4 py-2"
                    onClick={() => {
                      router.push(subItem.path);
                      closeNavbar(); // Close navbar on subitem click
                    }}
                  >
                    {subItem.label}
                  </li>
                ))}
              </ul>
            )}
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

  const closeNavbar = () => {
    setShowNavModal(false);
  };

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 right-0 border-b border-gray-200" style={{ backgroundColor: "#73c6d9" }}>
        <div className="max-w-screen-xl flex flex-col md:flex-row items-center justify-between mx-auto p-3">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <img
              src="images/logo.png"
              alt="Logo"
              className="w-14 h-14"
            />
            <span className="slef-center sm:text-2xl text-xl font-semibold whitespace-nowrap">
              MEMBERS
            </span>
          </div>
          <div className="flex md:order-2 gap-2 md:justify-start flex-wrap justify-between mt-0 md:mt-0">
            <div className="flex gap-2">  
              {!isAdminView && isAuthUser ? (
                <Fragment>
                  <button
                    className={
                      "inline-block px-5 py-3 text-xs font-medium upprcase tracking-wide text-red-500 "
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
              </div>
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
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <NavItems router={router} isAdminView={isAdminView} closeNavbar={closeNavbar} />
            </div>
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
            closeNavbar={closeNavbar}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
