import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Contactus.css"; // Add your custom CSS file for styling
import axios from "axios";
import Layout from './Layout';
const Contactus = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async(data) => {
    console.log(data);
    try {
     
      const res = await axios.post("/api/v1/user/complaint", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      
      if (res.data.success) {
        message.success("Complaint posted successfully");
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);

      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  

  return (
    <Layout>
    <div className="complaint-page">
      <motion.div
        className="complaint-box"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" className="heading">
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Typography variant="h5" className="sub-heading">
              Complaint Against
            </Typography>
            <TextField
              {...register("complaintAgainst", { required: true })}
              label="Enter Name"
              variant="outlined"
              fullWidth
              className="input"
              error={errors.complaintAgainst ? true : false}
              helperText={errors.complaintAgainst && "This field is required"}
            />
          </Box>
          <Box>
            <Typography variant="h5" className="sub-heading">
              Reason for Complaint
            </Typography>
            <TextField
              {...register("complaintReason", { required: true })}
              label="Enter Reason"
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              className="input"
              error={errors.complaintReason ? true : false}
              helperText={errors.complaintReason && "This field is required"}
            />
          </Box>
          
          <Button type="submit" variant="contained" className="submit-button">
            Send
          </Button>
        </form>
        {isSubmitted && (
          <Typography variant="body1" className="success-message">
            Thank you for submitting your complaint!
          </Typography>
        )}
      </motion.div>
    </div>
    </Layout>
  );
};

export default Contactus;
