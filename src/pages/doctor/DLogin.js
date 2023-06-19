import React from "react";
import "../../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        console.log(res.data.toke,"token rosha")
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        setTimeout(() => {
            navigate("/DApplyDoctor");
        }, 3000);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
  <>
  <div className="img1">
         <img src="Roshan.jpg"></img>
    </div>
    <div className="form-container-login ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="login-form"
      >
        <h3 className="text-center">Login</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <button className="btn" type="submit">
          Login
        </button>
      </Form>
    </div>
    </>
  );
};

export default DLogin;
