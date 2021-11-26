import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Input,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Check } from "@mui/icons-material";

import "./addProduct.scss";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../../store/productStore/productStore";
import { useGetAllCategoriesQuery } from "../../../../store/categoryStore/categoryStore";

const AddProduct = () => {
  const {
    data: allCategories,
    isLoading: catLoading,
    isError: isCatError,
    error: catError,
  } = useGetAllCategoriesQuery();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [warning, setWarning] = useState("");
  const [productInfo, setProductInfo] = useState({
    title: "",
    image: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
  });
  const { title, image, category, price, description, countInStock } =
    productInfo;
  const [addProduct, { isSuccess, isError, error }] = useAddProductMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && price && description && image && countInStock && category) {
      addProduct(productInfo);
      setWarning("");
    } else {
      setWarning("Something is missing,please recheck!");
    }
  };

  const handleAddValue = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleFiles = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const { data } = await axios({
        url: "/api/upload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      setUploading(false);

      setProductInfo({ ...productInfo, image: data });
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/products");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="addProduct">
      <div className="link">
        <Link className="link" to="/admin/products">
          Back To Products Page
        </Link>
      </div>
      <div className="addProd">Add Product</div>
      <div className="warning-setup">
        {warning && <Alert severity="warning">{warning}</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleAddValue}
            placeholder="Enter Your product title"
          />
        </div>
        <div className="form-control">
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleAddValue}
            placeholder="product price"
          />
        </div>
        <div className="form-control">
          <select
            name="category"
            value={category}
            onChange={handleAddValue}
            style={{ height: "60px" }}
          >
            <option value="" disabled>
              Choose Types ....
            </option>
            {allCategories?.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name.replace(/(?:^|\s)\S/g, function (a) {
                  return a.toUpperCase();
                })}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <input
            type="number"
            name="countInStock"
            value={countInStock}
            onChange={handleAddValue}
            placeholder="Number of Stock"
          />
        </div>
        <div className="file-upload">
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              className="file-input"
              onChange={handleFiles}
            />
            <Button variant="contained" component="span">
              Upload {uploading && <CircularProgress color="secondary" />}
            </Button>
          </label>
          {image && <img src={image} alt="" className="preview-img" />}
        </div>
        <div className="form-control">
          <textarea
            value={description}
            onChange={handleAddValue}
            name="description"
            id="w3review"
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <Button type="submit" fullWidth variant="contained" color="success">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
