import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import { VideoCameraOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from "moment";
import { message, Table, Modal, Button } from "antd";
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const navigate = useNavigate();
  const AppointmentModal = ({ record }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
 };

  const handleDownloadImage = () => {
    // Create a virtual anchor element
    const anchor = document.createElement("a");
    anchor.href = `data:image/jpeg;base64,${modalData.appointment.image}`;
    anchor.download = "patient_image.jpeg";
    
    // Trigger a click event on the anchor to initiate the download
    anchor.click();
  };
  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
        setFilteredAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleFilterAppointments = () => {
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
    const filtered = appointments.filter(appointment => appointment.date === rearrangedDate);
    setFilteredAppointments(filtered);
  };

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
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
          {record.date}<span/>{" "}
          <span/> 
          {record.doctorInfo}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Patient Details",
      dataIndex: "i",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => showModal(record)}>
            Details
          </Button>
        </div>
      ),
    },
    {
      title: "Conference",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
          {record.status === "approved" && (
            <span>
              <VideoCameraOutlined onClick={() => {
                  navigate(`/Videocall/${record._id}`);
                }} style={{ fontSize: '30px', color: 'red', paddingLeft: '20px' }} />
            </span>
          )}
          {record.status === "reject" && (
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
      <Button type="primary" onClick={handleFilterAppointments}>
        Show Today's Appointments
      </Button>
      <Table columns={columns} dataSource={filteredAppointments} />
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
               <Button onClick={handleDownloadImage}>Download Doc</Button>
              </div>
            ) : (
              <p>Invalid Image Data</p>
            )}
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default DoctorAppointments;
