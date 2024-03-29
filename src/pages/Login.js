import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        window.location.reload();
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="img1">
        <img src="Roshan.jpg" alt="Logo"></img>
      </div>
      <div className="form-container-login ">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="login-form"
        >
          <img className="logos" src="LOGO.jpg" alt="Logo"></img>
          <h3 className="text-center">Login</h3>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <button className="btn" type="submit">
            Login
          </button>
          <Link to="/register" className="link">
            Not a user yet? Register here.
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Login;
