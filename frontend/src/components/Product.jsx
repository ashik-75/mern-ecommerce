import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../store/cartStore/addToCart";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  title: {
    fontSize: 23,
    fontWeight: 500,
    letterSpacing: 2,
    textTransform: "capitalize",
    marginBottom: 10,
  },
  price: {
    fontSize: 25,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "capitalize",
    marginBottom: 10,
  },
  cont: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    display: "flex",

    justifyContent: "space-evenly",
  },
}));

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();

  const handleRoute = (id) => {
    navigate(`/products/${id}`);
  };

  const handleCart = () => {
    const provide = {
      product: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: 1,
    };
    dispatch(addItemToCart(provide));
  };
  return (
    <Link to={`/products/${product._id}`} className="link">
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt="green iguana"
        />
        <CardContent className={classes.cont}>
          <div className={classes.title}>
            {product.title.length > 15
              ? `${product.title.substr(0, 15)}...`
              : product.title}
          </div>
          <div className={classes.price}>₹{product.price}</div>
        </CardContent>
        {/* <CardActions className={classes.button}>
          <Button
            onClick={() => handleRoute(product._id)}
            sx={{ color: "black" }}
            size="small"
          >
            view details
          </Button>
          <Button onClick={handleCart} sx={{ color: "black" }} size="small">
            add to cart
          </Button>
        </CardActions> */}
      </Card>
    </Link>
  );
};

export default Product;
