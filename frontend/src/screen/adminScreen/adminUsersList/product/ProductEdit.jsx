import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { Edit, NavigateBefore } from "@mui/icons-material";
import "./productEdit.scss";

import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../../store/productStore/productStore";
import { useGetAllCategoriesQuery } from "../../../../store/categoryStore/categoryStore";

const useStyle = makeStyles((theme) => ({
  upload: {
    margin: "10px 0px",
    color: "red",
    height: 100,
    display: "flex",
  },
  img: {
    height: 80,
    width: 200,
    objectFit: "cover",
    marginLeft: 20,
  },
}));

export default function ProductEdit() {
  const navigate = useNavigate();
  const id = useParams().id;
  console.log("id", id);
  const classes = useStyle();
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    descriptin: "",
    category: "",
    image: "",
  });
  const { title, price, description, category, image } = productInfo;

  // get all categories
  const {
    data: allCategories,
    isLoading: catLoading,
    isError: isCatError,
    error: catError,
    isSuccess: catSuccess,
  } = useGetAllCategoriesQuery();

  const {
    data: singleProduct,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetSingleProductQuery(id);

  const [
    updateProduct,
    {
      data: updateRes,
      isLoading: updateLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateProductMutation();

  const handleValue = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProduct({ id, ...productInfo });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios({
        url: "/api/upload",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      setProductInfo({ ...productInfo, image: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setProductInfo(singleProduct);
    }

    if (updateSuccess) {
      navigate("/admin/products");
    }
  }, [isSuccess, singleProduct, updateSuccess]);

  return (
    <div className="productEdit">
      <div className="title">
        Edit Product {isLoading && <CircularProgress />}{" "}
      </div>

      {isError && <Alert>{error}</Alert>}
      {updateIsError && <Alert>{updateError}</Alert>}
      <form onSubmit={handleUpdate}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Product Title"
          type="text"
          name="title"
          value={title}
          fullWidth
          variant="standard"
          onChange={handleValue}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="product Price"
          type="text"
          name="price"
          value={price}
          fullWidth
          variant="standard"
          onChange={handleValue}
        />

        <FormControl fullWidth variant="standard" sx={{ my: 2 }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="category"
            value={category}
            label="Category"
            onChange={handleValue}
          >
            {catSuccess &&
              allCategories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div className={classes.upload}>
          <label htmlFor="contained-button-file">
            <Input
              sx={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <img className={classes.img} src={image} alt="" />
        </div>

        <TextField
          fullWidth
          id="standard-multiline-static"
          label="Product Description"
          multiline
          rows={10}
          value={description}
          variant="standard"
          onChange={handleValue}
          name="description"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
