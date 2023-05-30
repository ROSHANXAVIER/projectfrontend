import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table } from "antd";
import {VideoCameraOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

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
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
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
      title:"Video Call",
      dataIndex:"call",
      render: (text,record) => (
        <div className="d-flex">
        {record.status === "approved" && (
          <span>
          <VideoCameraOutlined style={{ fontSize: '30px', color: 'red',paddingLeft:'20px',cursor:'pointer' }}/>
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
