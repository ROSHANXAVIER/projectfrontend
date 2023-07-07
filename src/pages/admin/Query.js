import React from "react";
import { motion } from "framer-motion";
import "../../styles/Query.css"; // Import the CSS file
import Layout from "../../components/Layout";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const Query = () => {

    const [cardsData,setcardsData]=useState([]);
  // Dummy data for cards
//   const cardsData = [
//     { id: 1, name: "John Doe", complaint: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
//     { id: 2, name: "Jane Smith", complaint: "Nullam gravida mi vel dui fringilla consectetur." },
//     { id: 3, name: "Adam Johnson", complaint: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
//     { id: 3, name: "Adam Johnson", complaint: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
//     { id: 3, name: "Adam Johnson", complaint: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
//     { id: 3, name: "Adam Johnson", complaint: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
     
//   ];
  const getQuery = async (record, status) => {
    try {
      const res = await axios.get(
        "/api/v1/admin/getQuery",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log("success")
        setcardsData(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  };



  useEffect(() => {
    getQuery();
  }, []);

  return (
    <Layout>
    <div className="cards-page">
      <h1 className="page-heading">Complaints</h1>
      <div className="cards-container">
        {cardsData.map((card) => (
          <motion.div
            key={card._id}
            className="card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-content">
              <div className="name-box">{card.name}</div>
              <div className="complaint-box">{card.reason}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Query;
