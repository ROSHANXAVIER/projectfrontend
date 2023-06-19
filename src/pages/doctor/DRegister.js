import React from "react";
import "../../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
const DRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/DLogin");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  const go=()=>{
    navigate("/Register");
  }
  return (
    <>
    <div className="form-container ">
    <div className="dimg">
         <img src="https://img.freepik.com/premium-vector/health-care-program-metaphor-online-medicine-medical-insurance-hospital-services-preventive-check-up_566886-2769.jpg?w=2000"></img>
    </div>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Doctor Registration Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" placeholder="Enter name" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="Email-Id" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="Password" required />
          </Form.Item>
          <button className="btn" type="submit">
            Register
          </button>
          <button className="btn" onClick={go}>Go Back</button>
          </Form>
      </div>
      </div>
    </>
  );
};

export default DRegister;
