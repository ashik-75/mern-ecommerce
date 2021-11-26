import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartStore/addToCart";

const Quantity = ({ product }) => {
  const [qty, setQty] = useState(product?.qty);
  const dispatch = useDispatch();

  const handleBtn = (dir) => {
    dir === "plus"
      ? setQty((prev) => prev + 1)
      : setQty((prev) => (prev === 1 ? prev : prev - 1));
  };

  useEffect(() => {
    dispatch(addItemToCart({ ...product, qty }));
  }, [qty, dispatch]);

  return (
    <div>
      <button onClick={handleBtn}>-</button>
      <span>{qty}</span>
      <button onClick={() => handleBtn("plus")} className="btn">
        +
      </button>
    </div>
  );
};

export default Quantity;
