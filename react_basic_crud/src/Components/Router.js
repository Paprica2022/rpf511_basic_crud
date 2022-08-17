import React from "react";
// import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Join from "./Join";
import Login from "./Login";
import Content from "./Content"

const LoggedInRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/content" element={<Content />} />
        <Route from="*" to="/" />
    </Routes>
);

const LoggedOutRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login/>} />
        <Route from="*" to="/" />
    </Routes>
);


const AppRouter = ( data ) =>
    data.CurrentUser ? <LoggedInRoutes  /> : <LoggedOutRoutes />;

    



export default AppRouter;