import { Check, Clear, Delete, Edit } from "@mui/icons-material";
import { Alert, Button, CircularProgress } from "@mui/material";
import React from "react";

import "./orderList.scss";
import { useNavigate } from "react-router-dom";

import { useGetAllOrderQuery } from "../../../../store/orderStore/orderStore";

const OrderList = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAllOrderQuery();

  return (
    <div className="orderList">
      <div className="title">Show All the Orders</div>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>isPaid</th>
              <th>isDelivered</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order._id}>
                <td data-label="Title">{order._id}</td>
                <td data-label="Price">{order.createdAt}</td>
                <td data-label="Price">{order.totalPrice}</td>
                <td data-label="Image">
                  {order.isPaid ? (
                    <Check color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </td>
                <td data-label="Image">
                  {order.isDelivered ? (
                    <Check color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </td>
                <td data-label="Update">
                  <div>
                    <Button
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      variant="contained"
                    >
                      Details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
