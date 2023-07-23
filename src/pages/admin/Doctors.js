import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table, Modal, Button } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [modalData, setModalData] = useState({
    visible: false,
    cv: null,
  });

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeDoctor = async (record) => {
    try {
      console.log(record);
      const res = await axios.post(
        "/api/v1/admin/removeDoctor",
        { doctorId: record._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDownloadImage = () => {
    // Create a virtual anchor element
    const anchor = document.createElement("a");
    anchor.href = `data:image/jpeg;base64,${modalData.image}`;
    anchor.download = "CV_image.jpeg";
    
    // Trigger a click event on the anchor to initiate the download
    anchor.click();
  };
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  const showModal = (image) => {
    setModalData({
      visible: true,
      image,
    });
  };

  const handleCancel = () => {
    setModalData({
      visible: false,
      cv: null,
    });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Dislikes",
      dataIndex: "dislikes",
      render: (text, record) => (
        <span style={{ color: record.dislikes > 5 ? "red" : "inherit" }}>
          {record.dislikes}
        </span>
      ),
    },
    {
      title: "CV",
      dataIndex: "cv",
      render: (text, record) =>
        record.image ? (
          <Button type="primary" onClick={() => showModal(record.image)}>
            View CV
          </Button>
        ) : (
          <p>No CV Available</p>
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => removeDoctor(record)}>
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />

      <Modal
        title="Doctor CV"
        visible={modalData.visible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {modalData.image && (
          <div>
          <img
            src={`data:image/jpeg;base64,${modalData.image}`}
            alt="Doctor CV"
            style={{ width: "100%" }}
          />
          <Button onClick={handleDownloadImage}>Download Doc</Button></div>
        )}
      </Modal>
    </Layout>
  );
};

export default Doctors;
