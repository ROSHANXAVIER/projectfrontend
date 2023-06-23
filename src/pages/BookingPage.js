import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, Radio } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Input } from "antd";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Grid, Typography, Button, TextField } from "@mui/material";
import "../styles/BookingPage.css"; // Import the CSS file for custom styles

const localizer = momentLocalizer(moment);

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [blood, setBlood] = useState("");
  const [gender, setGender] = useState("");
  const [ill, setIll] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null); // New state variable for selected slot
  const [timeSlots,settimeSlots]=useState([ { slot: "9am - 10am", selection: "notselected" },
  { slot: "10am - 11am", selection: "notselected" },
  { slot: "11am - 12am", selection: "notselected" },
  { slot: "12am - 1pm", selection: "notselected" },
  { slot: "1pm - 2pm", selection: "notselected" },
  { slot: "2pm - 3pm", selection: "notselected" },
  { slot: "3pm - 4pm", selection: "notselected" },
  { slot: "4pm - 5pm", selection: "notselected" },
  { slot: "5pm - 6pm", selection: "notselected" },]);
  // Fetch doctor's data
  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("An error occurred. Please try again.");
    }
  };

  // Handle booking
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date || !time) {
        return alert("Date & Time are required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
          name: name,
          age: age,
          gender: gender,
          bloodgroup: blood,
          illness: ill,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
      else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getDoctorData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const sele = (slot) => {
    if (slot === "9am - 10am") {
      setTime([
        { slot: "9am - 10am", selection: "selected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "10am - 11am") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "selected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "11am - 12am") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "selected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "12am - 1pm") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "selected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "1pm - 2pm") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "selected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "2pm - 3pm") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "selected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "3pm - 4pm") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "selected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "4pm - 5pm") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "selected" },
        { slot: "5pm - 6pm", selection: "notselected" },
      ]);
    } else if (slot === "5pm - 6pm") {
      setTime([
        { slot: "9am - 10am", selection: "notselected" },
        { slot: "10am - 11am", selection: "notselected" },
        { slot: "11am - 12am", selection: "notselected" },
        { slot: "12am - 1pm", selection: "notselected" },
        { slot: "1pm - 2pm", selection: "notselected" },
        { slot: "2pm - 3pm", selection: "notselected" },
        { slot: "3pm - 4pm", selection: "notselected" },
        { slot: "4pm - 5pm", selection: "notselected" },
        { slot: "5pm - 6pm", selection: "selected" },
      ]);
    }
  };
  

  return (
    <Layout>
      <div className="booking-page-container">
        <div className="container m-2">
          {doctors && (
            <div className="doctor-details">
              <h4>
                Dr. {doctors.firstName} {doctors.lastName}
              </h4>
              <div className="form-fields">
                <DatePicker
                  aria-required={"true"}
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    const dae = moment(value).format("DD-MM-YYYY");

                    const slotAvailability = async () => {
                      try {
                        const res = await axios.post(
                          "/api/v1/user/slot-availability",
                          { doctorId: params.doctorId,userId:user._id, dae },
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        );
                        if (res.data.success) {
                          message.success(res.data.message);
                          settimeSlots(res.data.data);
                        } else {
                          message.error(res.data.message);
                        }
                      } catch (error) {
                        dispatch(hideLoading());
                        console.log(error);
                        message.error(
                          "An error occurred. Please try again."
                        );
                      }
                    };
                    slotAvailability();
                  }}
                />

                <div className="time-slots">
                  {timeSlots.map((slot) => (
                    <Button
                      variant="contained"
                      onClick={() => {setSelectedSlot(slot.slot);
                        sele(slot.slot)}}
                      key={slot.slot}
                      disabled={isAvailable}
                      className={`${
                        selectedSlot === slot.slot ? "selected" : "not-selected"
                      }`}
                    >
                      {slot.selection==="notselected" && (
                        <p>{slot.slot}</p>
                      )}
                      {slot.selection==="selected" && (<div>
                        <p className="booked">{slot.slot}</p>
                        <p className="booked">(BOOKED)</p>
                      </div>
                       
                      )}
                    </Button>
                  ))}
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      placeholder="Age"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Radio.Group
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      defaultValue="a"
                    >
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                    </Radio.Group>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      placeholder="Blood Group"
                      onChange={(e) => {
                        setBlood(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Brief your symptoms/illness"
                      maxLength={60}
                      onChange={(e) => {
                        setIll(e.target.value);
                      }}
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  className="mt-2"
                  onClick={handleBooking}
                  disabled={isAvailable}
                >
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
