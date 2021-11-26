import { Alert } from "@mui/material";
import { useState } from "react";
import Meta from "../../components/Meta";
import Products from "../../components/Products";
import CategorySkeleton from "../../components/skeleton/CategorySkeleton";
import NetPractise from "../../components/skeleton/NetPractise";
import { useGetAllCategoriesQuery } from "../../store/categoryStore/categoryStore";
import { useGetAllProductsQuery } from "../../store/productStore/productStore";
import "./homepage.scss";
const Homepage = () => {
  const [selectCat, setSelectCat] = useState("");

  const {
    data: allCategories,
    isLoading: catLoading,
    isError: isCatError,
    error: catError,
  } = useGetAllCategoriesQuery();
  const { data, isLoading, isError, error } = useGetAllProductsQuery();

  const filteredData = selectCat
    ? data.filter((prod) => prod?.category === selectCat)
    : data;
  return (
    <div className="homepage">
      <Meta />
      <div className="category-container">
        {catLoading ? (
          <CategorySkeleton />
        ) : (
          <>
            <span
              className={selectCat === "" ? "active btn" : "btn"}
              key={1}
              onClick={() => setSelectCat("")}
            >
              All
            </span>
            {allCategories?.map((category) => (
              <span
                className={selectCat === category.name ? "active btn" : "btn"}
                key={category._id}
                onClick={() => setSelectCat(category.name)}
              >
                {category.name}
              </span>
            ))}
          </>
        )}
      </div>
      {isLoading ? (
        <NetPractise />
      ) : isError ? (
        <Alert>{error}</Alert>
      ) : (
        <Products products={filteredData} />
      )}
    </div>
  );
};

export default Homepage;
