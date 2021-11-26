import React from "react";
import "./usersList.scss";
import { useGetAllUsersQuery } from "../../../../store/usersStore/usersStore";
import { CircularProgress, Alert, IconButton, Button } from "@mui/material";
import { Check, Clear, Delete, Edit } from "@mui/icons-material";
import UserEdit from "./UserEdit";

const UsersList = () => {
  const { data, isSuccess, isError, error, isLoading } = useGetAllUsersQuery();
  console.log("user list data", { data, isSuccess, isError, error, isLoading });

  return (
    <div className="usersList">
      <div className="title">Show All users</div>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert>{error}</Alert>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>isAdmin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="isAdmin">
                  {user.isAdmin ? (
                    <Check color="success" />
                  ) : (
                    <Clear color="error" />
                  )}
                </td>
                <td data-label="Actions" className="update-btns">
                  <div className="actions">
                    <UserEdit id={user._id} />

                    <Button sx={{ ml: 1 }} variant="outlined" color="error">
                      <Delete />
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

export default UsersList;
