import { Delete, Edit, Add } from "@mui/icons-material";
import {
  Alert,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  CLEAR_CART_ITEMS,
  removeShippingAddress,
} from "../../store/cartStore/addToCart";
import { useAddOrderMutation } from "../../store/orderStore/orderStore";
import PaymentSummary from "../cartScreen/PaymentSummary";
import EditAddress from "./EditAddress";
import ManageAddress from "./ManageAddress";
import "./shippingScreen.scss";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [warning, setWarning] = useState("");
  const [option, setOption] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");
  const [address, setAddress] = useState({});

  const shippingAddress = useSelector(
    (state) => state.addToCart.shippingAddress
  );

  const { cartItems } = useSelector((state) => state.addToCart);

  //   RTK qury
  const [addOrder, { isLoading, isSuccess, isError, error, data }] =
    useAddOrderMutation();

  // end RTK query

  //   calculation money
  const cart = {};
  cart.productPrice = cartItems.reduce(
    (acc, curr) => acc + curr.qty * curr.price,
    0
  );
  cart.shippingPrice = 50;

  //   end calculation money

  const handleRemove = (id) => {
    dispatch(removeShippingAddress(id));
  };

  useEffect(() => {
    const address = shippingAddress?.find(
      (address) => address.id === Number(option)
    );
    setAddress(address);
  }, [option]);

  const handleOrderSubmit = () => {
    const order = {
      shippingAddress: address,
      paymentMethod: paymentOption,
      shippingPrice: cart.shippingPrice,
      totalPrice: Number(cart.productPrice) + Number(cart.shippingPrice),
      orderItems: cartItems,
      isPaid: false,
      isDelivered: false,
    };
    if (!address) {
      setWarning("Address not selected");
    } else if (!paymentOption) {
      setWarning("Payment method not select");
    } else {
      addOrder(order);
      setWarning("");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/order/success/${data._id}`);
      localStorage.removeItem("cartItems");
      dispatch(CLEAR_CART_ITEMS());
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <div className="shippingScreen">
      {warning && (
        <Alert sx={{ mb: 2 }} variant="filled" severity="error">
          {warning}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <div className="shippingAddress">
            <div className="shipping-title">Shipping Address</div>
            <div className="shipping-details">
              {shippingAddress.length > 0 && (
                <>
                  <FormControl component="fieldset">
                    <RadioGroup
                      onChange={(e) => setOption(e.target.value)}
                      aria-label="gender"
                      name="row-radio-buttons-group"
                    >
                      {shippingAddress.map((address) => (
                        <FormControlLabel
                          key={address.id}
                          value={address.id}
                          control={<Radio />}
                          label={
                            <>
                              <Grid
                                key={address.id}
                                className="shipping-details-cont"
                                container
                                spacing={2}
                              >
                                <Grid item sm={8}>
                                  <div className="show-address">
                                    <div>
                                      <span>Name: </span>
                                      {address.name}
                                    </div>
                                    <div>
                                      <span>Phone: </span>
                                      {address.phone}
                                    </div>
                                    <div>
                                      <span>Alternative Phone: </span>
                                      {address.alternativePhone}
                                    </div>
                                    <div>
                                      <span>Address: </span>
                                      {address.address}
                                    </div>
                                  </div>
                                </Grid>
                                <Grid item sm={4}>
                                  <div className="icons">
                                    <span>
                                      <EditAddress address={address} />
                                    </span>
                                    <span>
                                      <IconButton
                                        onClick={() =>
                                          handleRemove(address?.id)
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    </span>
                                  </div>
                                </Grid>
                              </Grid>
                            </>
                          }
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </>
              )}
            </div>
            <div className="shipping-new-add">
              <ManageAddress />
            </div>
          </div>
          <div className="paymentOption">
            <div className="payment-title">Payment Method</div>
            <div className="payment-option">
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={(e) => setPaymentOption(e.target.value)}
                  aria-label="gender"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="cash-on"
                    control={<Radio />}
                    label="Cash On Delivery"
                  />
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="Paypal"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <PaymentSummary />
          <div className="confirm-order">
            <button onClick={handleOrderSubmit}>Confirm Order</button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShippingScreen;
