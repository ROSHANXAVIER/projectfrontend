import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import '../App.css'
import { message } from "antd";
import axios from "axios";


const DoctorList = ({ doctor }) => {
  const[feed,setFeed]=useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLike = async(e) => {
    e.stopPropagation();
        message.success("LIKED")
        console.log(doctor._id);
        try {
          const response = await axios.post('/api/v1/user/feed',
          { doctorId: doctor._id,feed:"LIKE"},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
          );
      
          if (response.data.success) {
            console.log('Likes updated successfully');
            // Handle the success case here
          } else {
            console.log('Failed to update likes');
            // Handle the failure case here
          }
        } catch (error) {
          console.error('An error occurred while updating likes:', error);
          // Handle the error case here
        }
  };

  const handleDislike = async(e) => {
    e.stopPropagation();
    message.success("DISLIKED")
        console.log(doctor._id);
        try {
          const response = await axios.post('/api/v1/user/feed',
          { doctorId: doctor._id,feed:"DISLIKE"},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
          );
      
          if (response.data.success) {
            console.log('Dislikes updated successfully');
            // Handle the success case here
          } else {
            console.log('Failed to update dislikes');
            // Handle the failure case here
          }
        } catch (error) {
          console.error('An error occurred while updating dislikes:', error);
          // Handle the error case here
        }
  };

  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience:</b> {doctor.experience}
          </p>
          <p>
            <b>Fee Per Consultation:</b> {doctor.feesPerCunsaltation}
          </p>
          <div className="feedback">
            <p><b>Feedback:</b></p>
            <div>
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="feedback-icon"
                onClick={handleLike}
              />
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="feedback-icon"
                onClick={handleDislike}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
