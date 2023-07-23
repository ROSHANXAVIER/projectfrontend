import React, { useState } from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { Attachment } from "@mui/icons-material";

export const DApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user, "curr usr");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feesPerCunsaltation: "",
  });
  const [attachment, setAttachment] = useState("");

  // Handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle Ant Design Form input change
  const handleFormInputChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };

  const imgChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setFileName(event.target.files[0].name);
    var reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = function () {
      console.log(btoa(reader.result));
      setAttachment(btoa(reader.result));
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleFinish = async () => {
    try {
      dispatch(showLoading());

      const formData = {
        ...formValues,
        userId: user._id,
        image: attachment,
      };

      const res = await axios.post("/api/v1/user/apply-doctor", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        setTimeout(() => {
          navigate("/DMessage");
        }, 2000);
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
    <div>
      <h2 className="text-center">Apply to be a Doctor</h2>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        onValuesChange={handleFormInputChange}
        className="m-3"
      >
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your first name"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input
                type="text"
                placeholder="your last name"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" value={formValues.phone}
                onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" value={formValues.email}
                onChange={handleInputChange}/> 
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="UPI ID" name="website">
              <Input type="text" placeholder="UPI ID" value={formValues.website}
                onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" value={formValues.address}
                onChange={handleInputChange}/>
            </Form.Item>
          </Col>
        </Row>
        {/* ... (other form items) */}
        
        <h4>Professional Details :</h4>
        <Row gutter={20}>
        <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" value={formValues.specialization}
                onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" value={formValues.experience}
                onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="fees" value={formValues.feesPerCunsaltation}
                onChange={handleInputChange}/>
            </Form.Item>
          </Col>
          </Row>
        <label className="custom-file-upload">
          <input
            type="file"
            id="fileInput"
            label="Image"
            name="myFile"
            accept=".jpeg, .png, .jpg"
            onChange={imgChangeHandler}
          />
          <span>
            <i className="fas fa-cloud-upload-alt"></i> Upload CV
          </span>
        </label>
        {fileName && (
          <div>
            <p>Selected file:</p>
            <p>{fileName}</p>
          </div>
        )}
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
