import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table,Modal,Button } from "antd";
import {VideoCameraOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  
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
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title:"Details",
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
      title:"Video Call",
      dataIndex:"call",
      render: (text,record) => (
        <div className="d-flex">
        {record.status === "approved" && (
          <span>
          <VideoCameraOutlined onClick={()=>{navigate('/Videocall')}} style={{ fontSize: '30px', color: 'red',paddingLeft:'20px',cursor:'pointer' }}/>
        </span>
       
        )}
        {record.status !== "approved" && (
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
      <h1>Appointments Lists</h1>
      <Table columns={columns} dataSource={appointments} />
      <h1>Enter the call portal during your time slot.</h1>
    </Layout>
  );
};

export default Appointments;
