import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addItemToCart, removeFromCart } from "../../store/cartStore/addToCart";
import "./cartScreen.scss";
import PaymentSummary from "./PaymentSummary";
import Quantity from "./Quantity";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.addToCart);

  const convetToTwoDcm = (price) => {
    return Number((Math.round(price * 100) / 100).toFixed(2));
  };

  const cart = {};

  cart.totalItems = cartItems.length;
  cart.subtotal = convetToTwoDcm(
    cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
  );

  cart.shipping = convetToTwoDcm(50);
  cart.totalPrice = convetToTwoDcm(cart.subtotal + cart.shipping);
  cart.payableTotal = convetToTwoDcm(cart.subtotal + cart.shipping);

  const handleCartRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleShipping = () => {
    navigate("/shipping");
  };
  return (
    <div className="cartScreen">
      {cart.totalItems === 0 ? (
        "your cart is empty"
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <div className="total-amount">
              <div className="left">
                <span>Total Items : </span> {cart.totalItems}
              </div>
              <div className="right">
                <span>Total Price : </span>
                {cart.payableTotal}
              </div>
            </div>
            <div className="show-products">
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.image} />
                      </ListItemAvatar>
                      <ListItemText primary={item.title} />
                      <ListItemText
                        primary={
                          <>
                            <Quantity product={item} />
                          </>
                        }
                      />
                      <ListItemText
                        primary={`Tk.${convetToTwoDcm(item.price * item.qty)}`}
                        secondary={
                          <Typography sx={{ ml: 1 }}>
                            {item.price} X {item.qty}
                          </Typography>
                        }
                      />
                      <ListItemText
                        primary={
                          <>
                            <IconButton
                              color="error"
                              onClick={() => handleCartRemove(item.product)}
                            >
                              <Delete />
                            </IconButton>
                          </>
                        }
                      />
                    </ListItem>
                    {index !== cartItems.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentSummary />

            <button onClick={handleShipping} className="shipping">
              Go to Shipping Page
            </button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CartScreen;
