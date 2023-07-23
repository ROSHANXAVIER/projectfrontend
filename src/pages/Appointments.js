import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, Modal, Button } from "antd";
import { VideoCameraOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const navigate = useNavigate();

  const [modalData, setModalData] = useState({
    visible: false,
    appointment: null
  });

  const showModal = (appointment) => {
    setModalData({
      visible: true,
      appointment
    });
  };

  const handleCancel = () => {
    setModalData({
      visible: false,
      appointment: null
    });
  };

  const handleOk = () => {
    setModalData({
      visible: false,
      appointment: null
    });
  };

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
        setTodayAppointments(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterTodayAppointments = () => {
    const today = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const dateString = today.toLocaleDateString("en-US", options);
    const date = dateString;
const parts = date.split("/");
const rearrangedDate = `${parts[1]}-${parts[0]}-${parts[2]}`;
    const filteredAppointments = appointments.filter(appointment => appointment.date === rearrangedDate);
    setTodayAppointments(filteredAppointments);
  };
  const handleDownloadImage = () => {
    // Create a virtual anchor element
    const anchor = document.createElement("a");
    anchor.href = `data:image/jpeg;base64,${modalData.appointment.image}`;
    anchor.download = "patient_image.jpeg";
    
    // Trigger a click event on the anchor to initiate the download
    anchor.click();
  };

  useEffect(() => {
    getAppointments();
  }, []);
  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {record.date}
          <span>{" "}</span>
          {record.doctorInfo}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Details",
      dataIndex: "_id",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => showModal(record)}>
            Details
          </Button>
        </div>
      ),
    },
    {
      title: "Video Call",
      dataIndex: "call",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "approved" ? (
            <span>
              <VideoCameraOutlined
                onClick={() => {
                  navigate(`/Videocalluser/${record._id}`);
                }}
                style={{ fontSize: '30px', color: 'red', paddingLeft: '20px', cursor: 'pointer' }}
              />
            </span>
          ) : (
            <span>
              <FontAwesomeIcon icon={faVideoSlash} style={{ fontSize: '30px', color: 'red', paddingLeft: '20px' }} />
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h2>Appointments Lists</h2>
      <Button type="primary" onClick={filterTodayAppointments}>
        Show Today's Appointments
      </Button>
      <Table columns={columns} dataSource={todayAppointments} />
      <Modal
        title="Patient Details"
        visible={modalData.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalData.appointment && (
          <>
            <p>Name: {modalData.appointment.name}</p>
            <p>Age: {modalData.appointment.age}</p>
            <p>Gender: {modalData.appointment.gender}</p>
            <p>BloodGroup: {modalData.appointment.bloodgroup}</p>
            <p>Symptoms: {modalData.appointment.illness}</p>
            {isBase64(modalData.appointment.image) ? (
              <div><span>DOCS : </span><img style={{height:"200px"}} src={`data:image/jpeg;base64,${modalData.appointment.image}`} alt="" />
               <Button onClick={handleDownloadImage}>Download Image</Button>
              </div>
            ) : (
              <p>Invalid Image Data</p>
            )}
          </>
        )}
      </Modal>
      <h5>Enter the call portal during your time slot.</h5>
    </Layout>
  );
};

export default Appointments;
