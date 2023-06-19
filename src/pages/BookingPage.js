import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Input, Radio } from "antd";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/BookingPage.css"; // Import the CSS file for custom styles

const localizer = momentLocalizer(moment);

const BookingPage = () => {
  const { TextArea } = Input;
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [blood, setBlood] = useState("");
  const [gender, setGender] = useState("");
  const [ill, setIll] = useState("");
  const [events, setEvents] = useState([{
    id: 1,
    title: "Booked",
    start: new Date(2023, 5, 19, 10, 0), // Year, Month (0-based), Day, Hour, Minute
    end: new Date(2023, 5, 19, 12, 0),
  }, {
    id: 2,
    title: "Event 2",
    start: new Date(2023, 5, 20, 14, 0),
    end: new Date(2023, 5, 20, 16, 0),
  },
  {
    id: 3,
    title: "trex",
    start: new Date(2023, 5, 20, 11, 0),
    end: new Date(2023, 5, 20, 12, 0),
  },]);

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

  // Fetch availability events for the doctor
  const getAvailabilityEvents = async () => {
    try {
      const res = await axios.get(`/api/v1/availability/${params.doctorId}`);
      if (res.data.success) {
        setEvents(res.data.availability);
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
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error);
    }
  };

  useEffect(() => {
    getDoctorData();
    getAvailabilityEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div>
        <h3>Booking Page</h3>
        <div className="container m-2">
          {doctors && (
            <div className="doctor-details">
              <h4>
                Dr. {doctors.firstName} {doctors.lastName}
              </h4>
              <h4>Fees: {doctors.feesPerCunsaltation}</h4>
              <h4>
                Timings: {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}
              </h4>
              <div className="form-fields">
                <DatePicker
                  aria-required={"true"}
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  aria-required={"true"}
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                  }}
                />

                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                <br />
                <br />
                <Input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <br />
                <Input
                  type="text"
                  placeholder="Age"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
                <br />
                <Radio.Group
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  defaultValue="a"
                >
                  <Radio.Button value="Male">Male</Radio.Button>
                  <Radio.Button value="Female">Female</Radio.Button>
                </Radio.Group>
                <br />
                <Input
                  type="text"
                  placeholder="Blood Group"
                  onChange={(e) => {
                    setBlood(e.target.value);
                  }}
                />
                <br />
                <TextArea
                  rows={4}
                  placeholder="Brief your symptoms/illness"
                  maxLength={60}
                  onChange={(e) => {
                    setIll(e.target.value);
                  }}
                />
                <br />
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              </div>
            </div>
          )}
          {events.length > 0 && (
            <div className="availability-calendar">
              <h4>Availability Heatmap</h4>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                
                style={{ height: 500 }}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
