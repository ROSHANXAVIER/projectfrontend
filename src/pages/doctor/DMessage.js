import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const DMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect to another page after 5 seconds
      localStorage.clear();
      navigate("/login");
    }, 3000);

})

  return (
    <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h2>Waiting for approval from admin...</h2>
      <p>Please wait while your request is being reviewed .</p>
    </div>
  );
};

export default DMessage;
