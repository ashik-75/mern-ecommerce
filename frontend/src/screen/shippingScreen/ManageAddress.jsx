import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addShippingAddress } from "../../store/cartStore/addToCart";
import { makeStyles } from "@mui/styles";
import { padding } from "@mui/system";

const useStyle = makeStyles((theme) => ({
  formControl: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px 20px",
    fontSize: "18px",
  },
  textarea: {
    width: "100%",
    padding: "10px 20px",
    fontSize: "18px",
  },
  btn: {
    width: "100%",
    padding: "12px 25px",
    backgroundColor: "black",
    color: "white",
    fontSize: "20px",
    border: "none",
    cursor: "pointer",
  },
  formContainer: {
    width: "100%",
  },
}));

const ManageAddress = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    alternativePhone: "",
    address: "",
  });
  const { name, phone, alternativePhone, address } = shippingInfo;

  const handleForm = (e) => {
    e.preventDefault();
    handleClose(false);
    dispatch(addShippingAddress({ id: Date.now(), ...shippingInfo }));

    console.log(shippingInfo);
  };

  const handleValue = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="manageAddress">
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Address
      </Button>

      <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Shipping Address</DialogTitle>
        <DialogContent>
          <form className={classes.formContainer} onSubmit={handleForm}>
            <div className={classes.formControl}>
              <input
                className={classes.input}
                required
                type="text"
                name="name"
                value={name}
                onChange={handleValue}
                placeholder="Enter name"
              />
            </div>
            <div className={classes.formControl}>
              <input
                required
                className={classes.input}
                type="text"
                name="phone"
                value={phone}
                onChange={handleValue}
                placeholder="Phone Number"
              />
            </div>
            <div className={classes.formControl}>
              <input
                className={classes.input}
                type="text"
                name="alternativePhone"
                value={alternativePhone}
                onChange={handleValue}
                placeholder="Alternative Phone"
              />
            </div>
            <div className={classes.formControl}>
              <textarea
                className={classes.textarea}
                required
                name="address"
                value={address}
                onChange={handleValue}
                placeholder="Write Address"
                // cols="30"
                rows="5"
              ></textarea>
            </div>
            <button className={classes.btn} type="submit">
              Save
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageAddress;
