import React, { useState, useEffect }  from "react";
import AppRouter from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/authService";
import Navigation from "./Partials/Navigation";

// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./components/Home";
// import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";


const App = () => {
  const [CurrentUser, setCurrentUser] = useState(undefined);

  useEffect(()=> {
    const user = AuthService.getCurrentUser();
    console.log("set user undefined");
    if(user){
      setCurrentUser(user);
      console.log(CurrentUser);
    }else{
      setCurrentUser(undefined);
      console.log("set user undefined");
    }
  },  [] );
  console.log(CurrentUser);

  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     setCurrentUser(user);
  //   }

  //   EventBus.on("logout", () => {
  //     logOut();
  //   });

  //   return () => {
  //     EventBus.remove("logout");
  //   };
  // }, []);

  // const logOut = () => {
  //   AuthService.logout();
  //   setCurrentUser(undefined);
  // };

  return (
    <div>
      
      <Navigation CurrentUser={CurrentUser}/>
      <div className="container mt-3">
        <AppRouter CurrentUser={CurrentUser} />

        {/* <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
        </Routes> */}
      </div>

    </div>
  );
};

export default App;
