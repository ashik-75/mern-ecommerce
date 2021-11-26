import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { REMOVE_USER_INFO } from "../../store/authStore/authSlice";

function UserDropdown({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(REMOVE_USER_INFO());
    navigate("/");
  };
  return (
    <div>
      <Button
        color="inherit"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user.name}
        <KeyboardArrowDown />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/user/profile");
            handleClose();
          }}
        >
          My Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserDropdown;
