import { Inbox } from "@mui/icons-material";
import {
  Alert,
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
// import Products from "../../../../backend/models/Product";
import Products from "../Products";
import { addItemToCart } from "../../store/cartStore/addToCart";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "../../store/productStore/productStore";
import Meta from "../Meta";
import ProductDetailsSkeleton from "../skeleton/ProductDetailsSkeleton";
import "./productDetails.scss";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleProductQuery(id);
  const { data: allProducts, isLoading: productsLoading } =
    useGetAllProductsQuery();

  const handleQty = (qt) => {
    if (qt === "plus") {
      setQty((prev) => prev + 1);
    } else {
      setQty((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleCart = () => {
    const provide = {
      product: data._id,
      title: data.title,
      price: data.price,
      image: data.image,
      category: data.category,
      qty,
    };
    dispatch(addItemToCart(provide));
  };
  return (
    <div className="productDetails">
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : isError ? (
        <Alert>{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          <Meta title={data.title} />
          <Grid item xs={12} sm={6}>
            <img className="prod-image" src={data.image} alt="" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="product-info">
              <div className="title">{data.title}</div>
              <div className="price">₹{data.price}</div>
              <div className="description">{data.description}</div>

              {data.countInStock > 0 && (
                <>
                  <div className="quantity">
                    <button
                      disabled={qty === 1}
                      onClick={() => handleQty("minus")}
                    >
                      -
                    </button>
                    <span>{qty}</span>
                    <button
                      disabled={qty === data.countInStock}
                      onClick={() => handleQty("plus")}
                    >
                      +
                    </button>
                    <button onClick={handleCart} className="cart-btn">
                      Add to cart
                    </button>
                  </div>
                </>
              )}

              <div className="extra-part">
                <ul>
                  <li>
                    <b>Availability</b>
                    <span>{data?.countInStock ? "Stock" : "Out Of Stock"}</span>
                  </li>
                  <li>
                    <b>Weight</b>
                    <span>10KG</span>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
      )}

      {/* Related Products */}
      <div className="related-products">
        <div className="related-title">Related Products</div>

        {productsLoading ? (
          "loading"
        ) : (
          <Products
            products={allProducts
              ?.filter(
                (prod) => prod.category === data?.category && prod._id !== id
              )
              .slice(0, 3)}
          />
        )}
      </div>

      {/* End of Related Products */}
    </div>
  );
};

export default ProductDetails;
