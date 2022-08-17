import React, { useState, useRef } from "react";

import { isEmail } from "validator";
import { Navigate } from "react-router-dom";
import AuthService from "../services/authService";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};



const Join = () => {
    const form = useRef();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [location, setLocation] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    }
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangePasswordCheck = (e) => {
        const pcheck = e.target.value;
        setPasswordCheck(pcheck);
    };
    const onChangeLocation = (e) => {
        const loc = e.target.value;
        setLocation(loc);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);



        const response = await AuthService.postJoin(name,username, email, password,passwordCheck,location);
        if (response.status === 200) {
            setMessage(response.data.message);
            setSuccessful(true);
            // return (<Navigate replace to="/"></Navigate>)
        } else {

            setMessage("error");
        }

    };

    return (
        <div className="col-md-12">
            <div className="card card-container">


                <form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={onChangeName}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordCheck">Password Check</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="passwordCheck"
                                    value={passwordCheck}
                                    onChange={onChangePasswordCheck}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={location}
                                    onChange={onChangeLocation}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Join</button>
                            </div>
                        </div>
                    )}

                    {/* {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                            >
                                {message}
                            </div>
                        </div>
                    )} */}
                    {message==="SUCCESS_JOIN"&&(
                        <Navigate replace to="/login"></Navigate>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Join;
