import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Typography, Space, Modal, message } from "antd";
import Layout from "../../components/Layout";
const { Title } = Typography;

const Coinreq = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getRequests = async () => {
    try {
      const res = await axios.get("/api/v1/admin/requests",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(res.data.requests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => <span>{amount} R Coin</span>,
    },
    {
      title: "UPI ID",
      dataIndex: "paymentMethod",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Button onClick={() => handleConfirmPayment(record)}>R COIN</Button>
      ),
    },
  ];

  const handleConfirmPayment = (request) => {
    setSelectedRequest(request);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    // Call the backend API to confirm the payment and update the request status
    try {
      const res=await axios.post("/api/v1/admin/confirmPayment", {
        requestId: selectedRequest._id,
        amount:selectedRequest.amount
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success(res.data.message);
      setModalVisible(false);
      setSelectedRequest(null);
      // Refresh the requests list after confirming the payment
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalCancel = async() => {
    try {
      const res=await axios.post("/api/v1/admin/cancelPayment", {
        requestId: selectedRequest._id,
        amount:selectedRequest.amount
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.error(res.data.message);
      setModalVisible(false);
      setSelectedRequest(null);
      // Refresh the requests list after confirming the payment
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>Requests</Title>
      <Table columns={columns} dataSource={requests} rowKey="_id" />

      <Modal
        title="Confirm Payment"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {selectedRequest && (
          <div>
            <p>User ID: {selectedRequest.userId}</p>
            <p>Amount: {selectedRequest.amount} R Coin</p>
            <p>UPI ID: {selectedRequest.paymentMethod}</p>
          </div>
        )}
      </Modal>
    </div>
    </Layout>
  );
};

export default Coinreq;
