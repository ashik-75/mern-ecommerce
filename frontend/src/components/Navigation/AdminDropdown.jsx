import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function AdminDropdown() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePath = (path) => {
    navigate(path);
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
        Admin
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
            handlePath("/admin/users");
            handleClose();
          }}
        >
          Users
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePath("/admin/products");
            handleClose();
          }}
        >
          Products
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePath("/admin/orders");
            handleClose();
          }}
        >
          Orders
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AdminDropdown;
