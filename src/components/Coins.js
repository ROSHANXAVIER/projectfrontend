import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Typography, Card, Space, Checkbox, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;

const Coins = () => {
  const [upiID] = useState("rxgody@okicici");
  const [coinsAmount, setCoinsAmount] = useState(0);
  const [coinsRequestPending, setCoinsRequestPending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const { user } = useSelector((state) => state.user);

  console.log(user);

  const handleCoinsRequest = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/request-coins",
        {
          userId: user._id,
          amount: coinsAmount,
          paymentMethod: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setCoinsRequestPending(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <Card
          title="Admin's UPI ID"
          style={{ background: "#1890ff", color: "white" }}
        >
          <Text strong>{upiID}</Text>
        </Card>

        <Card title="Purchase Coins" style={{ marginTop: "20px" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>UPI ID used for payment</Text>
            <Input
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Eg : Varun@okicici"
            />

            <Input
              type="number"
              addonAfter="R Coin"
              value={coinsAmount}
              onChange={(e) => setCoinsAmount(e.target.value)}
            />
            <Text strong>1 R Coin = 1 Rupee</Text>

            <Space>
              <InfoCircleOutlined style={{ color: "#1890ff" }} />
              <Text>
                You can request coins once you have made the payment. We will
                update your wallet within 24hrs.
              </Text>
            </Space>

            <Checkbox
              checked={paymentConfirmed}
              onChange={(e) => setPaymentConfirmed(e.target.checked)}
              style={{ marginTop: "10px" }}
            >
              I agree I have made my payment
            </Checkbox>

            <Button
              type="primary"
              disabled={coinsRequestPending || !paymentConfirmed}
              onClick={handleCoinsRequest}
              style={{ background: "#1890ff" }}
            >
              Request Coins
            </Button>
            {coinsRequestPending && (
              <div style={{ marginTop: "10px", color: "green" }}>
                Coins Requested and Pending Approval
              </div>
            )}
          </Space>
        </Card>
      </div>
    </Layout>
  );
};

export default Coins;
