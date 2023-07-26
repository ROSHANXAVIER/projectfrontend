import React from "react";
import { Typography, Card } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { useState ,useEffect} from "react";
import axios from "axios";
import Layout from "./Layout";
const { Title, Text } = Typography;

const Wallet = () => {
  const [balance,setBalance]=useState(0);

  const handleCoinsRequest = async () => {
    try {
      const res = await axios.get("/api/v1/user/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      setBalance(res.data.balance);
    } catch (error) {
      console.log("Error: Unable to connect to the server");
    }
  };
  
  useEffect(() => {
    handleCoinsRequest();
  }, []);

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

export default Wallet;
