import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import "./signUp.scss";
import { useRegisterMutation } from "../../../store/authStore/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_LOGIN_INFO } from "../../../store/authStore/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { isError, error, isSuccess, data }] =
    useRegisterMutation();

  const [warning, setWarning] = useState("");

  const { name, email, password, confirmPassword } = signUpInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setWarning("Name is Required");
    } else if (!email) {
      setWarning("Email is Required");
    } else if (!password) {
      setWarning("password is Required");
    } else if (
      password.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) === -1
    ) {
      setWarning(
        "Password Minimum eight characters, at least one letter and one number"
      );
    } else if (!confirmPassword) {
      setWarning("password must be  confirmed");
    } else if (password.trim() !== confirmPassword.trim()) {
      setWarning("Password and confirm password must be matched");
    } else {
      registerUser(signUpInfo);
      setWarning("");
    }
  };

  const handleValue = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
      dispatch(ADD_LOGIN_INFO(data));
    }
  }, [isSuccess, navigate, dispatch, data]);
  return (
    <div className="signup">
      <div className="form-container">
        {isError && (
          <Alert sx={{ mb: 2 }} severity="error">
            {error}
          </Alert>
        )}
        {warning && (
          <Alert sx={{ mb: 2 }} severity="warning">
            {warning}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="name"
              name="name"
              value={name}
              placeholder="Enter Full Name"
              onChange={handleValue}
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter Valid email"
              onChange={handleValue}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={handleValue}
            />

            <small>
              Password must be contains letter,number and minimum password
              length is six
            </small>
          </div>
          <div className="form-control">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Enter Confirm Password"
              onChange={handleValue}
            />
          </div>
          <button type="submit">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
