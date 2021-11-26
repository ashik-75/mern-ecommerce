import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../../store/usersStore/usersStore";
import { useState, useEffect } from "react";

export default function UserEdit({ id }) {
  const [open, setOpen] = useState(false);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValue = (e) => {
    if (e.target.name === "isAdmin") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.checked });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = () => {
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
      setOpen(false);
    }
  }, [isSuccess, singleUser, updateSuccess]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Edit />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edit User {isLoading && <CircularProgress />}{" "}
        </DialogTitle>
        {isError && <Alert>{error}</Alert>}
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
