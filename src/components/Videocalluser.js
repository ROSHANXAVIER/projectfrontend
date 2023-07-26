import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VideocamIcon from "@mui/icons-material/Videocam";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Videocall.css";

const Videocalluser = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState("You will get your link soon...");
  const [isLinkAvailable, setIsLinkAvailable] = useState(false);
  const [but, setBut] = useState("WAIT..");
  const [upiId, setUpiId] = useState("");

  const getLink = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/gmeetGet",
        { user: user, appid: params.appId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success && res.data.data !== "You will get your link soon...") {
        setLink(res.data.data);
        setUpiId(res.data.upi);
        setIsLinkAvailable(true);
        setBut("OPEN LINK");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = () => {
    navigate("/appointments");
  };

  const handleOpenLink = () => {
    window.open(link, "_blank");
  };

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(upiId);
  };

  const MINUTE_MS = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      getLink();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="root">
      <div className="return-button" onClick={handleReturn}>
        Return
      </div>
      
      <motion.div
        className={`box ${isLinkAvailable ? "active" : ""}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: -150 }}
        transition={{ duration: 0.8 }}
      >
         <Typography variant="h2" className="heading">
        Video Call
      </Typography>
        <VideocamIcon className="icon" />
        <TextField
          label="Link"
          variant="outlined"
          className="input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          className={`button ${isLinkAvailable ? "active" : ""}`}
          onClick={handleOpenLink}
        >
          {but}
        </Button>
      </motion.div>
      
    </div>
  );
};

export default Videocalluser;