import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

const PaymentSummary = () => {
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

  return (
    <div className="checkout-summary">
      <div className="title">Checkout Summary</div>
      <Divider />
      <div className="checkout-container">
        <div className="summary">
          <span>Subtotal</span>
          <span>{cart.subtotal}</span>
        </div>
        <div className="summary">
          <span>Shipping</span>
          <span>{cart.shipping}</span>
        </div>
        <div className="summary">
          <span>Total</span>
          <span>{cart.totalPrice}</span>
        </div>
        <div className="summary payable">
          <span>Payable Total</span>
          <span>{cart.payableTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
