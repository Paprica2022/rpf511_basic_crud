import React  from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import "./header.css";
import AuthService from "../../services/authService";
// import { API_URL } from "../../_variablesURL"


const Navigation = (data) => {
  const LoggedIn = data.CurrentUser;
  // const navigate = useNavigate();
  // const [message,setMessage]= useState("");

  
  

  
  const logOut = () => {
    AuthService.logout();
  };

  
  return (
    <div className="navbar">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <Link to={"/"} className="nav-link">
            Home
          </Link>


          {/* {LoggedIn && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )} */}
        </div>

        {LoggedIn ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/content"} className="nav-link" >
                token
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {LoggedIn.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/join"} className="nav-link">
                Join
              </Link>
            </li>
          </div>
        )}
      </nav>
      {/* {
        message === "SUCCESS_TOKEN_VERIFY" &&
        <Navigate replace to="/content" message={message} ></Navigate>
      } */}
    </div>
    
  );
}

export default Navigation;