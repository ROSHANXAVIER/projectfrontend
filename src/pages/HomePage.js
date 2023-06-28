import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Select } from "antd";
import DoctorList from "../components/DoctorList";
import { useSelector } from "react-redux";
import PieChart from "../components/PieChart";
import { blueGrey } from "@mui/material/colors";
import { Bar } from "react-chartjs-2";

const { Option } = Select;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [pieData, setPieData] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [userData, setUserData] = useState(null);
  const [patient,setPatientData]=useState([]);
  const [feed,setFeed]=useState(" ");
  const [peed,setPeed]=useState(" ");
    const likesStyle = {
    color: "#00bcd4",
    marginRight: "0.5rem",
  };

  const dislikesStyle = {
    color: "#f44336",
    marginRight: "0.5rem",
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data.doctors);
        setPatientData(res.data.data.patients);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const feeds = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/feedGet",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (res.data.success) {
        setFeed(res.data.data)
      } else {
        
      }
    } catch (error) {
    
      console.log(error);
     
    }
  };

  console.log(user);

  useEffect(() => {
    getUserData();
    piedataDoctor();
    feeds()
  }, []);

  const piedataDoctor = async () => {
    try {
      const res = await axios.get("/api/v1/user/getPieData", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        const pendingAppointments = res.data.data.find(
          (data) => data._id === "PENDING"
        );
        const approvedAppointments = res.data.data.find(
          (data) => data._id === "APPROVED"
        );
        const rejectedAppointments = res.data.data.find(
          (data) => data._id === "REJECTED"
        );

        setPieData(res.data.data);
        setFeed(res.data.like);
        setPeed(res.data.dislike);
        const userData = {
          datasets: [
            {
              data: [
                pendingAppointments ? pendingAppointments.len : 0,
                approvedAppointments ? approvedAppointments.len : 0,
                rejectedAppointments ? rejectedAppointments.len : 0,
              ],
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                blueGrey[500], // Use blueGrey[500] for rejected appointments
              ],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
          labels: ["PENDING", "APPROVED", "REJECTED"], // Add "REJECTED" label
        };

        setUserData(userData);
        console.log(res.data, "COMING");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpecializationChange = (value) => {
    setSelectedSpecialization(value);
  };

  // Chart data for the number of doctors and patients
  const doctorPatientData = {
    labels: ["Doctors", "Patients"],
    datasets: [
      {
        label: "Number of Doctors and Patients",
        data: [doctors.length, patient.length],
        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {!user?.isAdmin && !user?.isDoctor && (
        <Layout>
          <div style={{ background: "rgb(30, 61, 77)", height: "100%" }}>
            <h1 style={{ color: "white" }} className="text-center">
              Choose Doctor
            </h1>
            <div className="text-center mt-4">
              <Select
                style={{ width: 200 }}
                placeholder="Select Specialization"
                onChange={handleSpecializationChange}
                value={selectedSpecialization}
              >
                <Option value="">All Specializations</Option>
                <Option value="Psychologist">Psychology</Option>
                <Option value="Dermatology">Dermatology</Option>
                <Option value="Orthopedics">Orthopedics</Option>
                {/* Add more options for other specializations */}
              </Select>
            </div>
            <Row>
              {doctors &&
                doctors
                  .filter(
                    (doctor) =>
                      selectedSpecialization === "" ||
                      doctor.specialization === selectedSpecialization
                  )
                  .map((doctor) => <DoctorList doctor={doctor} />)}
            </Row>
          </div>
        </Layout>
      )}

      {user?.isAdmin && (
        <Layout>
          <div
            style={{
              background: "rgb(30, 61, 77)",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <h2 style={{color:"white"}}>USERS</h2>
            <div style={{ marginTop: "20px", width: "400px" }}>
              <Bar
                data={doctorPatientData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: "white", // Color of the y-axis labels
                      },
                    },
                    x: {
                      grid: {
                        color: "rgba(255, 255, 255, 0.2)", // Color of the horizontal grid lines
                      },
                      ticks: {
                        color: "white", // Color of the x-axis labels
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        </Layout>
      )}

{user?.isDoctor && (
  <Layout>
   <div
  style={{
    background: "rgb(30, 61, 77)",
    height: "100%",
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    padding: "2rem",
    borderRadius: "10px",
  }}
>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h1 style={{ color: "white", marginBottom: "1rem" }}>APPOINTMENTS</h1>
    {userData && (
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <PieChart chartData={userData} />
      </div>
    )}
  </div>
  <div style={{ color: "white", display: "flex", flexDirection: "column", alignItems: "center",marginBottom:"5px",paddingBottom:"155px" }}>
    <h1 style={{ marginBottom: "5rem" ,color:"white"}}>RATINGS</h1>
    <div style={{ display: "flex", alignItems: "center" }}>
  <i className="fas fa-thumbs-up" style={{ marginRight: "0.5rem", fontSize: "1.5rem", color: likesStyle.color }}></i>
  <span style={{ ...likesStyle, fontSize: "1.5rem", fontWeight: "bold" }}> {feed}</span>
</div>
<div style={{ display: "flex", alignItems: "center" }}>
  <i className="fas fa-thumbs-down" style={{ marginRight: "0.5rem", fontSize: "1.5rem", color: dislikesStyle.color }}></i>
  <span style={{ ...dislikesStyle, fontSize: "1.5rem", fontWeight: "bold" }}> {peed}</span>
</div>

  </div>
</div>

  </Layout>
)}

    </div>
  );
};


export default HomePage;
