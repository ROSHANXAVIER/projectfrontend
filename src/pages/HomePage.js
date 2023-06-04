import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
import { useSelector } from "react-redux";
import '../App.css'
import {faFingerprint} from  '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const { user } = useSelector((state) => state.user);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",

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
   console.log(user);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
    {
      !user?.isAdmin &&(
      <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
      )
    }
      {
      user?.isAdmin &&(
        <Layout>
        <div style={{background:"#330101",height:"100%",display:"grid",placeItems:"center"}}>
            <h1 className="text-center" style={{color:"white"}}>ADMIN PAGE</h1>
            <FontAwesomeIcon className='fingerprint' icon={faFingerprint} />
        </div>
        </Layout>
      )
    }
   
    {/* <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
    </div> */}
    </div>
  );
};

export default HomePage;
