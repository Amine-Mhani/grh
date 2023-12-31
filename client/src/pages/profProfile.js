import React, { useState, useEffect } from 'react';

import Drawer from '../components/drawer';
import Box from '@mui/material/Box';
import Breadcrumb from '../components/breadcrumb';
import ProfileBar from '../components/profileBar';
import ProfileData from '../components/profileData';
import { useProf } from '../context/ProfContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const backLink = process.env.REACT_APP_BACK_LINK
  const { prof } = useProf();

  const [token, setToken] = useState('');
    console.log(token);
// Function to extract user ID from the JWT token
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.id; // Assuming "id" is the key used in the token payload
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// Get the user ID from the token
const agentId = getUserIdFromToken(token);
const [agent, setAgent] = useState(null);

const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // Set the token in your component state
          setToken(storedToken);
        }
        // } else {
        //   // If no token is found, navigate to the login page
        //   navigate('/');
        // }
      }, [navigate]);
useEffect(() => {
  const fetchAgentData = async () => {
    try {
      const response = await axios.get(backLink+`/agent/agents/${agentId}`);
      setAgent(response.data);
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  if (agentId) {
    fetchAgentData();
  }
}, [agentId]);


  return (
    <Box sx={{ display: 'flex' }}>
      {/* <Drawer role="Admin" /> */}

      {agent ? (
            (agent.__t === "Admin" && agent.fonction === "Chef de Département") ? (
              <Drawer role='Chef' pageTitle={"Profile Professeur"}/>
            ) : (agent.__t === "Admin")?(
              <Drawer role='Admin' pageTitle={"Profile Professeur"}/>
            ):null
          ) : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "5%",
          marginLeft: "5%",
          marginRight: "5%",
          // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add the boxShadow property
        }}
      >
        {/* <Breadcrumb /> */}
        <>&nbsp;</>
        <ProfileBar agent={prof} />
        <ProfileData agent={prof} />
      </Box>
    </Box>
  );
}
