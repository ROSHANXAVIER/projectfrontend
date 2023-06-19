import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Select } from "antd";
import DoctorList from "../components/DoctorList";
import { useSelector } from "react-redux";
import PieChart from "../components/PieChart";

const { Option } = Select;

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [pieData, setPieData] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  useEffect(() => {
    getUserData();
    piedataDoctor();
  }, []);

  const labe = ["PENDING", "APPROVED"];

  const piedataDoctor = async () => {
    try {
      const res = await axios.get("/api/v1/user/getPieData", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setPieData(res.data.data);
        const userData = {
          datasets: [
            {
              data: res.data.data.map((data) => data.len),
              backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1"],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
          labels: res.data.data.map((data) => data._id),
        };
        setUserData(userData);
        console.log(res.data, "COMING");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [userData, setUserData] = useState(null);

  const handleSpecializationChange = (value) => {
    setSelectedSpecialization(value);
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
            {userData && (
              <div style={{ width: 300 }}>
                <PieChart chartData={userData} />
              </div>
            )}
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
            }}
          >
            {userData && (
              <div style={{ width: 300 }}>
                <PieChart chartData={userData} />
              </div>
            )}
          </div>
        </Layout>
      )}
    </div>
  );
};

export default HomePage;
