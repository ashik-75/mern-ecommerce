import { Delete } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  useGetSingleOrderQuery,
  useUpdateOrderByPaymentMutation,
  useUpdateOrderByDeliveredMutation,
  useDeleteOrderMutation,
} from "../../../../store/orderStore/orderStore";

import "./order.scss";

const Order = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);

  const [
    deleteOrder,
    {
      isSuccess: orderDeleted,
      isError: isOrderDelError,
      error: orderDeleteError,
    },
  ] = useDeleteOrderMutation();

  const [
    updateOrderByPay,
    { isLoading: payLoading, isError: isPayError, error: payError },
  ] = useUpdateOrderByPaymentMutation();
  const [
    updateOrderByDelivered,
    {
      isLoading: isDeliverLoading,
      isError: isDeliverError,
      error: deliverError,
    },
  ] = useUpdateOrderByDeliveredMutation();
  const { data, isSuccess, isLoading, isError, error } = useGetSingleOrderQuery(
    params.id
  );

  const convetToTwoDcm = (price) => {
    return Number((Math.round(price * 100) / 100).toFixed(2));
  };

  const cart = {};
  if (!isLoading) {
    cart.subtotal = convetToTwoDcm(
      data.orderItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
    );
  }

  const handleDelivered = (id) => {
    updateOrderByDelivered(id);
  };

  const handlePayment = (id) => {
    updateOrderByPay(id);
  };

  const handleOrderDelete = (id) => {
    deleteOrder(id);
    console.log("order delete ", id);
  };

  useEffect(() => {
    if (orderDeleted) {
      navigate("/admin/orders");
    }
  }, [orderDeleted]);

  return (
    <div className="orderScreen">
      {cart.totalItems === 0 ? (
        "your cart is empty"
      ) : (
        <>
          {isLoading ? (
            "loading.."
          ) : isError ? (
            <Alert>{error}</Alert>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <div className="total-amount">
                  <div className="left">
                    <span>Order Id : </span> {data._id}
                  </div>
                </div>

                <div className="shipping-address">
                  <div className="title">Shipping Address</div>
                  <div className="dt">Name: {data.shippingAddress.name}</div>
                  <div className="dt">Phone: {data.shippingAddress.phone}</div>
                  <div className="dt">
                    Alternative Phone: {data.shippingAddress.alternativePhone}
                  </div>
                  <div className="dt">
                    Address: {data.shippingAddress.address}
                  </div>

                  <div className="shipping-alert">
                    {data.isDelivered ? (
                      <Alert variant="filled" severity="success">
                        Order Delivered ({data.deliveredAt})
                      </Alert>
                    ) : (
                      <Alert variant="filled" severity="error">
                        Not Delivered
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="payment">
                  <div className="title">Payment Method</div>
                  <div className="dt">Method: {data.paymentMethod}</div>
                  <div className="payment-btn">
                    {user && user.isAdmin && !data.isPaid && (
                      <button onClick={() => handlePayment(data._id)}>
                        confirm payment
                      </button>
                    )}
                  </div>
                  <div className="shipping-alert">
                    {data.isPaid ? (
                      <Alert variant="filled" severity="success">
                        Paid
                      </Alert>
                    ) : (
                      <Alert variant="filled" severity="error">
                        Not Paid
                      </Alert>
                    )}
                  </div>
                </div>
                <div className="show-products">
                  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {data.orderItems.map((item, index) => (
                      <div key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={item.image} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.title}
                            secondary={
                              <>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {item.category}
                                </Typography>
                              </>
                            }
                          />

                          <ListItemText
                            primary={`${item.price} X ${
                              item.qty
                            } = Tk.${convetToTwoDcm(item.price * item.qty)}`}
                          />
                        </ListItem>
                        {index !== data.orderItems.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </div>
                    ))}
                  </List>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="checkout-summary">
                  <div className="title">Order Summary</div>
                  <Divider />
                  <div className="checkout-container">
                    <div className="summary">
                      <span>Subtotal</span>
                      <span>{cart.subtotal}</span>
                    </div>
                    <div className="summary">
                      <span>Shipping</span>
                      <span>{data.shippingPrice}</span>
                    </div>
                    <div className="summary">
                      <span>Total</span>
                      <span>{data.totalPrice}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleOrderDelete(data._id)}
                  className="deleteOrder"
                >
                  Delete Order
                </button>

                {user && user.isAdmin && data.isPaid && !data.isDelivered && (
                  <button
                    onClick={() => handleDelivered(data._id)}
                    className="shipping"
                  >
                    Mark As Delivered
                  </button>
                )}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </div>
  );
};

export default Order;
