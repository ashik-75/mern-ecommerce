import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Login from "./screen/authScreen/login/Login";
import SignUp from "./screen/authScreen/signup/SignUp";
import { useSelector } from "react-redux";
import UsersList from "./screen/adminScreen/adminUsersList/user/UsersList";
import UserEdit from "./screen/adminScreen/adminUsersList/user/UserEdit";
import ProductsList from "./screen/adminScreen/adminUsersList/product/ProductsList";
import AddProduct from "./screen/adminScreen/adminUsersList/product/AddProduct";
import Homepage from "./screen/homepage/Homepage";
import ProductDetails from "./components/productDetails/ProductDetails";
import CartScreen from "./screen/cartScreen/CartScreen";
import ShippingScreen from "./screen/shippingScreen/ShippingScreen";
import OrderList from "./screen/adminScreen/adminUsersList/orders/OrderList";
import Order from "./screen/adminScreen/adminUsersList/orders/Order";
import ProfileScreen from "./screen/profileScreen/ProfileScreen";
import ShippingSuccess from "./screen/shippingScreen/ShippingSuccess";
import Footer from "./components/footer/Footer";
import NetPractise from "./components/skeleton/NetPractise";
import UserOrder from "./screen/profileScreen/UserOrder";
import ProductEdit from "./screen/adminScreen/adminUsersList/product/ProductEdit";

const App = () => {
  const { user } = useSelector((state) => state.authSlice);
  const { cartItems } = useSelector((state) => state.addToCart);
  const isLoggedIn = Object.keys(user).length > 0;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sk" element={<NetPractise />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/user/profile"
          element={isLoggedIn ? <ProfileScreen /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/admin/users"
          element={
            isLoggedIn && user.isAdmin ? <UsersList /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/user/:id/edit"
          element={
            isLoggedIn && user.isAdmin ? <UserEdit /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/products"
          element={
            isLoggedIn && user.isAdmin ? <ProductsList /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/products/add"
          element={
            isLoggedIn && user.isAdmin ? <AddProduct /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/product/:id/edit"
          element={
            isLoggedIn && user.isAdmin ? <ProductEdit /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/orders"
          element={
            isLoggedIn && user.isAdmin ? <OrderList /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/user/:id/edit"
          element={
            isLoggedIn && user.isAdmin ? <UserEdit /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/orders/:id"
          element={isLoggedIn && user.isAdmin ? <Order /> : <Navigate to="/" />}
        />
        <Route
          path="/shipping"
          element={
            !isLoggedIn ? (
              <Navigate to="/login?next=shipping" />
            ) : cartItems?.length > 0 ? (
              <ShippingScreen />
            ) : (
              <Navigate to="/cart" />
            )
          }
        />
        <Route
          path="/order/success/:id"
          element={
            isLoggedIn ? (
              <ShippingSuccess />
            ) : (
              <Navigate to="/login?next=shipping" />
            )
          }
        />
        <Route
          path="/profile/userorder/:id"
          element={
            isLoggedIn ? <UserOrder /> : <Navigate to="/login?next=shipping" />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
