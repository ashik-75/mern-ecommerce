import { Alert, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import "./login.scss";
import { useLoginMutation } from "../../../store/authStore/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_LOGIN_INFO } from "../../../store/authStore/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation().search?.split("=")[1];

  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [warning, setWarning] = useState("");
  const [loginProceed, { isError, isSuccess, error, data, isLoading }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginInfo.email) {
      setWarning("Email is Requied");
    } else if (!loginInfo.password) {
      setWarning("Password is required");
    } else {
      setWarning("");
      loginProceed(loginInfo);
    }
  };

  const handleLoginValue = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(ADD_LOGIN_INFO(data));
      if (location) {
        navigate(`/${location}`);
      } else {
        navigate("/");
      }
    }
  }, [isSuccess, navigate, data, dispatch, location]);

  return (
    <div className="login">
      <div className="form-container">
        {isError && (
          <Alert sx={{ mb: 2 }} severity="error">
            {error?.data}
          </Alert>
        )}
        {warning && (
          <Alert sx={{ mb: 2 }} severity="warning">
            {warning}
          </Alert>
        )}
        {isLoading && <CircularProgress sx={{ mb: 2 }} />}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="email"
              value={loginInfo.email}
              onChange={handleLoginValue}
              placeholder="Enter Your Email "
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleLoginValue}
              placeholder="Enter valid Password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
