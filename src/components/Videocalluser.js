import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VideocamIcon from "@mui/icons-material/Videocam";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import "../styles/Videocall.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Videocalluser = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState("You will get your link soon...");

  const getlink = async () => {
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
      if (res.data.success) {
        setLink(res.data.data);
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

  const MINUTE_MS = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      getlink();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="root">
      <div className="return-button" onClick={handleReturn}>
        Return
      </div>
      <Typography variant="h1" className="heading">
        Video Call
      </Typography>
      <Box className="box">
        <VideocamIcon className="icon" />
        <TextField
          label="Link"
          variant="outlined"
          className="input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <br />
        <Button variant="contained" className="button" onClick={handleOpenLink}>
          Open Link
        </Button>
      </Box>
    </div>
  );
};

export default Videocalluser;
