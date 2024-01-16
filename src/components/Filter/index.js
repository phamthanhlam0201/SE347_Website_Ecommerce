import React, { useState, useEffect } from "react";

const ProductFilter = ({ onFilterChange, onFilterSubmit, onClearFilters }) => {
  const [category, setCategory] = useState("All");
  const [color, setColor] = useState("All");
  const [price, setPrice] = useState("");

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    onFilterChange({ category: selectedCategory });
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);
    console.log(selectedColor);
    onFilterChange({ color: selectedColor });
  };

  const handlePriceChange = (event) => {
    const enteredPrice = event.target.value;
    setPrice(enteredPrice);
    onFilterChange({ price: enteredPrice });
  };

  const handleFilterSubmit = () => {
    // Gọi hàm xử lý lọc khi người dùng nhấn nút "Filter"
    onFilterSubmit();
  };

  const handleClearFilters = () => {
    // Đặt lại giá trị mặc định khi người dùng nhấn nút "Clear"
    setCategory("");
    setColor("");
    setPrice("");
    onClearFilters();
  };

  useEffect(() => {
    // Khi giá trị category, color, price thay đổi, cập nhật giá trị cho input/select
    document.getElementById("categorySelect").value = category || "All";
    document.getElementById("colorSelect").value = color || "All";
    document.getElementById("priceInput").value = price || "";
  }, [category, color, price]);

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="border border-gray-500 rounded-md">
          <div className="flex ml-4">
            <label className="font-bold">Category:</label>
            <select id="categorySelect" className="w-full" onChange={handleCategoryChange}>
              <option value="All">All</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Pants">Pants</option>
              <option value="Jeans">Jeans</option>
              {/* Thêm các lựa chọn khác cho Category nếu cần */}
            </select>
          </div>
        </div>
        <div className="border border-gray-500 rounded-md">
          <div className="flex ml-4">
            <label className="font-bold">Color:</label>
            <select id="colorSelect" className="w-full" onChange={handleColorChange}>
              <option value="All">All</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Gray">Gray</option>
              <option value="Blue">Blue</option>
              {/* Thêm các lựa chọn khác cho Color nếu cần */}
            </select>
          </div>
        </div>
        <div className="border border-gray-500 rounded-md">
          <div className="flex ml-4">
            <label className="font-bold">Price:</label>
            <input id="priceInput" className="w-full mr-2" type="number" placeholder="Enter price" onChange={handlePriceChange} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* Thêm nút để áp dụng bộ lọc */}
          <button style={{ backgroundColor: "#73c6d9" }} className="border border-gray-500 rounded-md px-4" onClick={handleFilterSubmit}>Filter</button>
          <button style={{ backgroundColor: "#73c6d9" }} className="border border-gray-500 rounded-md px-4" onClick={handleClearFilters}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
