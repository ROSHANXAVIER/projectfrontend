import React, { useState, useEffect } from "react";
import { Typography, Card, Button, message } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import axios from "axios";
import Layout from "./Layout";
const { Title,Text } = Typography;

const Dwallet = () => {
  const [balance, setBalance] = useState(0);
  // Replace this with the user's actual balance from the backend
  const handleCoinsRequest = async () => {
    try {
      const res = await axios.get("/api/v1/user/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      setBalance(res.data.balance);
      console.log("Error: Unable to get balance");
    } catch (error) {
      console.log("Error: Unable to connect to the server");
    }
  };

  useEffect(() => {
    handleCoinsRequest();
  }, []);

  const handleRedeemBalance = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/redeem",
        { amount: balance }, // You can pass the amount to redeem here
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setBalance(0); // Reset balance to 0 after redeeming
        message.success("Redeemed successfully");
      } else {
        message.error("Error: Unable to redeem balance");
      }
    } catch (error) {
      console.log("Error: Unable to connect to the server");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <Card
          title={
            <Title level={2}>
              <WalletOutlined style={{ marginRight: "10px", color: "#1890ff" }} />
              <div style={{ color: "#1890ff" }}>R COIN</div>
            </Title>
          }
          style={{
            textAlign: "center",
            background: "#f0f5ff",
            border: "1px solid #e8e8e8",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.09)",
            borderRadius: "8px",
          }}
        >
          {/* Display the user's R Coin balance in a big font */}
          <Title level={1} style={{ marginBottom: "30px", color: "#1890ff" }}>
            {balance}
          </Title>

          <Typography style={{ color: "blue" }}>BALANCE</Typography>
          {balance > 0 ? (
        <Button type="primary" onClick={handleRedeemBalance}>
          Redeem Balance
        </Button>
      ) : (
        <p>Insufficient balance to redeem</p>
      )}
        </Card>
        {/* Note Box */}
        <Card
          style={{
            height:"20vh",
            textAlign: "center",
            background: "#fff",
            border: "1px solid #e8e8e8",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.09)",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          <Text strong>For any queries, please contact:</Text>
          <br />
          <Text>Phone: 9447567495</Text>
          <br />
          <Text>Email: rxgody@gmail.com</Text>
        </Card>
      </div>
    </Layout>
  );
};

export default Dwallet;
