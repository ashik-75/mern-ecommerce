import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./shippingSuccess.scss";
import { useGetSingleOrderQuery } from "../../store/orderStore/orderStore";

const ShippingSuccess = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isError, error, isLoading } = useGetSingleOrderQuery(
    params.id
  );

  useEffect(() => {
    if (!isLoading && !isSuccess) {
      navigate("/");
    }
  }, [isLoading, isSuccess, navigate]);

  return (
    <div className="shippingSuccess">
      {isLoading
        ? "loading"
        : isSuccess && (
            <>
              <div className="title">Order Placed Successfully</div>
              <span>
                <Link to="/">Back to Home</Link>
              </span>
            </>
          )}
    </div>
  );
};

export default ShippingSuccess;
