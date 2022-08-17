import React, { useState, useEffect } from "react";
import AuthService from "../services/authService";
import {API_URL} from "../_variablesURL"
import axios from "axios";



const Content = () => {
    const [message, setMessage] = useState("");
  
    const getServerVerify = async () => {
      const config = {
        headers: {
          Authorization: `${AuthService.getCurrentToken()}`
        },
      }
      const response = await axios.get(API_URL + "/api/token", config);
      console.log(response)
      setMessage(response.data.message);
      
    }
    
    useEffect( ()=> {
      getServerVerify();
      
      
    }, []);
    return (
      <div className="container">
  
          <h1>content</h1>
          <span>{message}</span>
  
      </div>
    );
  };
  
  export default Content;