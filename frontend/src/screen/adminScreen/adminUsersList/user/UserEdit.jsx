import * as React from "react";

import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../../store/usersStore/usersStore";
import { useState, useEffect } from "react";
import "./userEdit.scss";

export default function UserEdit() {
  const navigate = useNavigate();
  const id = useParams().id;
  const {
    data: singleUser,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetSingleUserQuery(id);

  const [
    updateUser,
    {
      data: updateRes,
      isLoading: updateLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateUserMutation();

  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
    isAdmin: false,
  });
  const { name, email, isAdmin } = userInfo;

  const handleValue = (e) => {
    if (e.target.name === "isAdmin") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.checked });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ id, ...userInfo });
  };

  useEffect(() => {
    if (isSuccess) {
      setUserInfo({
        name: singleUser.name,
        email: singleUser.email,
        isAdmin: singleUser.isAdmin,
      });
    }

    if (updateSuccess) {
      navigate("/admin/users");
    }
  }, [isSuccess, singleUser, updateSuccess]);

  return (
    <div className="userEdit">
      <div className="user-container">
        <div className="title">
          Edit User {isLoading && <CircularProgress />}{" "}
        </div>
        {isError && <Alert>{error}</Alert>}

        <form onSubmit={handleUpdate}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="name"
            name="name"
            value={name}
            fullWidth
            variant="standard"
            onChange={handleValue}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            name="email"
            value={email}
            fullWidth
            variant="standard"
            onChange={handleValue}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isAdmin"
                checked={isAdmin}
                onChange={handleValue}
              />
            }
            label="isAdmin"
          />

          <Button fullWidth variant="contained" type="submit">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
