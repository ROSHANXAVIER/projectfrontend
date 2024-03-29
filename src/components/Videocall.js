import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VideocamIcon from "@mui/icons-material/Videocam";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import "../styles/Videocall.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Videocall = () => {
  const [prescription, setPrescription] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const handleReturn = () => {
    navigate("/doctor-appointments");
  };

  const handleSendPrescription = async () => {
    try {
      // Make an API call to send the prescription to the patient
      const res = await axios.post(
        "/api/v1/doctor/sendPrescription",
        { prescription:prescription, appId: params.appId }, // Pass the prescription data along with the appointment ID
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        // Reset the prescription input field after successful sending
        setPrescription("");
        message.success("Prescription sent successfully");
      } else {
        message.error("Error sending prescription");
      }
    } catch (error) {
      console.error("Error sending prescription:", error);
    }
  };
  const handleSendLink = async () => {
    try {
      // Make an API call to send the link
     
      const res = await axios.post(
        "/api/v1/doctor/setGmeet",
        { link: link, appId: params.appId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Perform any necessary actions after sending the link
      if (res.data.success) {
        
        console.log("Link sent successfully");
        message.success(res.data.message);
      }
    } catch (error) {
      console.error("Error sending link:", error);
    }
  };

  const handleGoToGoogleMeet = () => {
    // Open Google Meet link in a new tab
    window.open("https://meet.google.com/", "_blank");
  };

  return (
    <div className="root">
      <div className="return-button" onClick={handleReturn}>
        Return
      </div>
      <div className="google-meet-button" onClick={handleGoToGoogleMeet}>
        Google Meet
      </div>
      <Typography variant="h1" className="heading">
        Video Call
      </Typography>
      <Box className="box">
        <VideocamIcon className="icon" />
        <TextField
          label="Enter Google Meet Link"
          variant="outlined"
          className="input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br></br>
        <Button
          variant="contained"
          className="button"
          onClick={handleSendLink}
        >
          Send Link To Patient
        </Button>
      </Box>
      <Box className="pbox">
        <TextField
          label="Prescription"
          variant="outlined"
          multiline
          rows={4}
          className="input"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />
        <Button
          variant="contained"
          className="button"
          onClick={handleSendPrescription}
        >
          Send Prescription
        </Button>
      </Box>
    </div>
  );
};

export default Videocall;
