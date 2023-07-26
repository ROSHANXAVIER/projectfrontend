import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Space, message } from "antd";
import Layout from "../../components/Layout";
const Redeem = () => {
  const [redeemRequests, setRedeemRequests] = useState([]);

  const getRedeemRequests = async () => {
    try {
      const res = await axios.get("/api/v1/admin/redeem-requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setRedeemRequests(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/accept-redeem",
        {user:requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Redeem request accepted successfully");
        getRedeemRequests();
      } else {
        message.error("Failed to accept redeem request");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/reject-redeem",
        { user:requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.error("Redeem request rejected successfully");
        getRedeemRequests();
      } else {
        message.error("Failed to reject redeem request");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getRedeemRequests();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "UPI",
      dataIndex: "upi",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (requestId) => (
        <Space>
          <Button type="primary" onClick={() => handleAccept(requestId)}>
            Accept
          </Button>
          <Button danger onClick={() => handleReject(requestId)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
    <div>
      <h2>Redeem Requests</h2>
      <Table columns={columns} dataSource={redeemRequests} />
    </div>
    </Layout>
  );
};

export default Redeem;
