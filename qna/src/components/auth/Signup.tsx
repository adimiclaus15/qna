import React, { useRef } from 'react'
import { useState } from 'react';
import "./Login.scss";
import { useContext } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

export interface Props {
    [key: string]: any
}

interface FormDataType {
    password: string,
    email: string,
}

const Signup = ({history}: Props) => {
    const {signup} = useContext (AuthContext);
    const [hidden, setHidden] = useState(true);
    const [formData, setFormData] = useState <FormDataType> ({password: "", email: ""});
    const navigate = useNavigate();

    const handleFormChange = (key: string) => (e: any) => {
        setFormData({...formData, [key]: e.target.value})
    }


    const togglePassword = () => {
        setHidden(!hidden);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await signup(formData.email, formData.password);
        navigate("/");
        setFormData({email: "", password: ""});
    }

    return (
        <>
            <div className="auth">
                <div className="header">
                    <p>Let's Create An Account!</p>
                </div>
                <form onSubmit = {handleSubmit}>
                <div className="input-wrapper">
                        <i className="fas fa-at"></i>
                        <input value={formData.email} onChange={handleFormChange("email")} type="email" required placeholder="Email"/>
                    </div>
                    <div className="input-wrapper">
                        <i className="fas fa-lock"></i>
                        <input value={formData.password} onChange={handleFormChange("password")} type = {hidden ? "password" : "text"} required placeholder="Password"/>
                        {hidden ? 
                            <i className="fas fa-eye" onClick = {togglePassword}/> : 
                            <i className="fas fa-eye-slash" onClick = {togglePassword}></i>
                        }
                    </div>
                    <input type = "submit" value = "Signup"/>
                </form>
                {/* <Link to = "/forgot" className = "mirror">Forgot Password?</Link> */}
                <Link to = "/login" className = "mirror">Log In</Link>
            </div>
        </>
    );
}

export default Signup;