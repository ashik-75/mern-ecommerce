import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByUserQuery } from "../../store/orderStore/orderStore";
import "./profileScreen.scss";
import { Check, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);
  const [count, setCount] = useState(1);
  const { data, isError, isSuccess, error, isLoading } =
    useGetOrdersByUserQuery();

  console.log("users order", { data, isError, isSuccess, error, isLoading });

  return (
    <div className="profileScreen">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <Paper sx={{ mb: 2 }}>
            <div className="container">
              <div className="right">
                <div className="top">Hello,</div>
                <div className="down">{user.name}</div>
              </div>
            </div>
          </Paper>

          <Paper elevation={3}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={count === 1}
                onClick={() => setCount(1)}
              >
                <ListItemText primary="My Profile" />
              </ListItemButton>
              <ListItemButton
                onClick={() => setCount(2)}
                selected={count === 2}
              >
                <ListItemText primary="My Orders" />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          {count === 1 ? (
            <Paper elevation={3}>
              <div className="user-info">
                <div className="name">
                  <span>Name: </span> <br />
                  <span className="fullName">{user.name}</span>
                </div>
                <div className="name">
                  <span>Email: </span> <br />
                  <span className="fullName">{user.email}</span>
                </div>
              </div>
            </Paper>
          ) : (
            <Paper sx={{ p: 3 }} elevation={3}>
              {isLoading ? (
                "loading..."
              ) : isError ? (
                <div>{error?.data}</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>date</th>
                      <th>isPaid</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((order) => (
                      <tr key={order._id}>
                        {/* <td data-label="ID">{order._id}</td> */}
                        <td data-label="date">{order.createdAt}</td>
                        <td data-label="isPaid">
                          {order.isPaid ? (
                            <Check color="success" />
                          ) : (
                            <Close color="error" />
                          )}
                        </td>
                        <td data-label="isDelivered">
                          {order.isDelivered ? (
                            <Check color="success" />
                          ) : (
                            <Close color="error" />
                          )}
                        </td>
                        <td data-label="Details">
                          <Button
                            onClick={() =>
                              navigate(`/profile/userorder/${order._id}`)
                            }
                          >
                            See Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileScreen;
