import {
  Category,
  Delete,
  Edit,
  SecurityUpdateWarningTwoTone,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../../../store/productStore/productStore";
import {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoriesMutation,
  useDeleteCategoryMutation,
} from "../../../../store/categoryStore/categoryStore";
import "./productsList.scss";
import { useNavigate } from "react-router-dom";
import ProductEdit from "./ProductEdit";

const ProductsList = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [option, setOption] = useState("products");
  const [warning, setWarning] = useState(false);
  const [editCat, setEditCat] = useState("");

  // category related call;

  const [updateCat] = useUpdateCategoriesMutation();
  const [deleteCat] = useDeleteCategoryMutation();
  const {
    data: allCategories,
    isLoading: catLoading,
    isError: isCatError,
    error: catError,
  } = useGetAllCategoriesQuery();

  const [addcategory, { isLoading: addCatLoading, isSuccess: catSuccess }] =
    useAddCategoryMutation();

  // end category related

  // product related
  const { isLoading, isError, data, error } = useGetAllProductsQuery();
  const [
    deleteProduct,
    { isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorRes },
  ] = useDeleteProductMutation();

  // end product related

  const addProduct = () => {
    navigate("/admin/products/add");
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handleCategory = (e) => {
    e.preventDefault();
    if (!category) {
      setWarning(true);
    } else {
      addcategory({ name: category });
      setCategory("");

      setWarning(false);
    }
  };

  const handleCatEdit = (e) => {
    e.preventDefault();

    updateCat(editCat);
    setEditCat("");
  };

  const handleCatDelete = (id) => {
    deleteCat(id);
  };
  return (
    <div className="productList">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Paper elevation={3}>
            <List>
              <ListItem>
                <ListItemButton
                  sx={{ p: 2 }}
                  selected={option === "products"}
                  onClick={() => setOption("products")}
                >
                  Products
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{ p: 2 }}
                  selected={option === "category"}
                  onClick={() => setOption("category")}
                >
                  Category
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Paper elevation={2} sx={{ p: 3, minHeight: "100vh" }}>
            {option === "products" ? (
              <>
                {deleteError && (
                  <Alert variant="filled" severity="error">
                    {deleteErrorRes}
                  </Alert>
                )}
                <div className="add-product">
                  <Button
                    onClick={addProduct}
                    sx={{ mb: 3 }}
                    variant="contained"
                  >
                    Add Product
                  </Button>
                </div>
                {isLoading ? (
                  <CircularProgress />
                ) : isError ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>title</th>
                        <th>price</th>
                        <th>category</th>
                        <th>image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((product) => (
                        <tr key={product._id}>
                          <td data-label="Title">{product.title}</td>
                          <td data-label="Price">{product.price}</td>
                          <td data-label="Price">{product.category}</td>
                          <td data-label="Image">
                            <img
                              className="table-img"
                              src={product.image}
                              alt=""
                            />
                          </td>
                          <td data-label="Update">
                            <div className="actions">
                              {product?._id && <ProductEdit id={product._id} />}

                              <Button
                                onClick={() => handleDelete(product._id)}
                                variant="contained"
                                color="error"
                                sx={{ ml: 1 }}
                              >
                                <Delete />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            ) : (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {catLoading ? (
                      "loading"
                    ) : isCatError ? (
                      <Alert variant="error">{catError}</Alert>
                    ) : (
                      allCategories.map((category) => (
                        <div key={category._id}>
                          <div className="category">
                            <div className="left">{category.name}</div>
                            <div className="right">
                              <span>
                                <IconButton
                                  color="success"
                                  onClick={() =>
                                    setEditCat({
                                      id: category._id,
                                      name: category.name,
                                    })
                                  }
                                >
                                  <Edit />
                                </IconButton>
                              </span>
                              <span>
                                <IconButton
                                  onClick={() => handleCatDelete(category._id)}
                                  color="error"
                                >
                                  <Delete />
                                </IconButton>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className="category-form">
                      {editCat ? (
                        <form onSubmit={handleCatEdit}>
                          <div className="form-control">
                            <input
                              type="text"
                              className={warning ? "error" : ""}
                              value={editCat.name}
                              onChange={(e) =>
                                setEditCat({ ...editCat, name: e.target.value })
                              }
                              placeholder="Category Name"
                            />
                          </div>
                          <button type="submit">Edit</button>
                        </form>
                      ) : (
                        <form onSubmit={handleCategory}>
                          <div className="form-control">
                            <input
                              type="text"
                              className={warning ? "error" : ""}
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              placeholder="Category Name"
                            />
                          </div>
                          <button type="submit">Add</button>
                        </form>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsList;
