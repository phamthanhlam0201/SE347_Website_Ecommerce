"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect, useState } from "react";
import Notification from "../Notification";
import ProductFilter from "../Filter";

export default function CommonListing({ data }) {
  const router = useRouter();
  const [filters, setFilters] = useState({ category: "All", color: "All", price: "" });
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    router.refresh();
  }, []);

  const handleFilterChange = (updatedFilter) => {
    // Cập nhật trạng thái của bộ lọc khi người dùng thay đổi
    setFilters((prevFilters) => ({ ...prevFilters, ...updatedFilter }));
  };
  const handleFilterSubmit = () => {
    // Xử lý logic lọc dữ liệu dựa trên bộ lọc hiện tại
    setFilteredData(data);
    
    const newData = data.filter((item) => {
      const categoryPass = filters.category === "All" || item.category === filters.category || item.onSale ===filters.category;
      // Kiểm tra xem item.color là mảng và filter.color có tồn tại trong mảng không
      const colorPass = filters.color === "All" || (Array.isArray(item.colors) && item.colors.some(colors => colors.id === filters.color));
      // Kiểm tra xem filters.price và item.price có tồn tại và là chuỗi số hợp lệ không
      const pricePass =
        filters.price === "" ||
        (filters.price && isNumeric(filters.price) && item.price && isNumeric(item.price) && parseInt(item.price*(1-item.priceDrop/100)) <= parseInt(filters.price));
  
      return categoryPass && colorPass && pricePass;
    });
  
    // Cập nhật trạng thái dữ liệu lọc
    setFilteredData(newData);
  };
  
  // Hàm kiểm tra chuỗi có phải là số hợp lệ hay không
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  const handleClearFilters = () => {

    // Hiển thị tất cả sản phẩm ban đầu
    setFilteredData(data);
  };
  console.log(data)
  return (
    <section className="bg-white py-12 sm:py-16 mt-4 lg:mt-0">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <ProductFilter
          onFilterChange={handleFilterChange}
          onFilterSubmit={handleFilterSubmit}
          onClearFilters={handleClearFilters}
        />
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 sm:mt-0">
          {filteredData && filteredData.length
            ? filteredData.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
}
