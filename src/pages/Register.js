import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import DRegister from "./doctor/DRegister";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (rule, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address.");
  };

  const validatePassword = (rule, value) => {
    if (!value || value.length >= 6) {
      return Promise.resolve();
    }
    return Promise.reject("Password must be at least 6 characters long.");
  };

  // Form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="form-container ">
        <div className="img">
          <img src="register.jpg" alt="Register" />
        </div>
        <div className="form-container">
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="register-form"
          >
            <h3 className="text-center">Patient Registration Form</h3>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name." }]}
            >
              <Input type="text" placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email." },
                { validator: validateEmail },
              ]}
            >
              <Input type="email" placeholder="Email-Id" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password." },
                { validator: validatePassword },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <button className="btn" type="submit">
              Register
            </button>
            <Link to="/login" className="link">
              Already a user? Login here.
            </Link>
            <br />
            <br />
            <Link to="/DRegister">Are you a doctor?</Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
