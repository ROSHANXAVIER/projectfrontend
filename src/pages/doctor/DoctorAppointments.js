import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import {VideoCameraOutlined} from '@ant-design/icons';
import axios from "axios";
import moment from "moment";
import { message, Table ,Modal,Button} from "antd";
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getAppointments();
  }, []);

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
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title:"Patient Details",
      dataIndex:"date",
      render:(text,record)=>(
        <div>
            <Button type="primary" onClick={showModal}>
        Details
      </Button>
      <Modal title="Patient Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Name: {record.name}</p>
        <p>Age: {record.age}</p>
        <p>Gender: {record.gender}</p>
        <p>BloodGroup: {record.bloodgroup}</p>
        <p>Symptoms: {record.illness}</p>
      </Modal>
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
          {
            record.status==="approved" && (
              <span>
                <VideoCameraOutlined style={{ fontSize: '30px', color: 'red',paddingLeft:'20px' }}/>
              </span>
            )
          }
           {record.status === "reject" && (
          <span>
          <FontAwesomeIcon icon={faVideoSlash} style={{ fontSize: '30px', color: 'red',paddingLeft:'20px' }}/>
        </span>
       
        )}
          
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Appoinmtnets Lists</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
