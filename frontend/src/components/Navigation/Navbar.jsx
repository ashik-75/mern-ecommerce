import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import { Menu as MenuIcon, AddShoppingCart } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import UserDropdown from "./UserDropdown";
import AdminDropdown from "./AdminDropdown";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#22223b",
    height: "80px",
    display: "flex",
    justifyContent: "center",
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);
  const classes = useStyle();

  const { cartItems } = useSelector((state) => state.addToCart);

  const handleButton = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.root}>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="link">
            Ecom
          </Link>
        </Typography>

        <Link to="/cart" className="link">
          <IconButton sx={{ color: "white" }} aria-label="cart">
            <Badge badgeContent={cartItems.length} color="primary">
              <AddShoppingCart />
            </Badge>
          </IconButton>
        </Link>

        {Object.keys(user).length > 0 ? (
          <>
            <UserDropdown user={user} />
            {user?.isAdmin && <AdminDropdown />}
          </>
        ) : (
          <>
            <Button onClick={() => handleButton("/login")} color="inherit">
              Login
            </Button>
            <Button onClick={() => handleButton("/signup")} color="inherit">
              SignUp
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
