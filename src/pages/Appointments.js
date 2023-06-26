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
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

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
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
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
                  navigate('/Videocall');
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
      <h1>Appointments Lists</h1>
      <Table columns={columns} dataSource={appointments} />
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
          </>
        )}
      </Modal>
      <h1>Enter the call portal during your time slot.</h1>
    </Layout>
  );
};

export default Appointments;
