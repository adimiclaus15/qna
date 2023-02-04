import React from 'react'
import { useState } from 'react';
import "./Login.scss";
import {Link, useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { redirect } from "react-router-dom";

export interface Props {
    [key: string]: any
}


const Login = ({history}: Props) => {
    const {login} = useContext(AuthContext);
    const [hidden, setHidden] = useState(true);
    const [formData, setFormData] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleFormChange = (key: string) => (e: any) => {
        setFormData({...formData, [key]: e.target.value})
    }

    const togglePassword = () => {
        setHidden(!hidden);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await login(formData.email, formData.password);
        navigate("/");
        setFormData({email: "", password: ""});
    }

    return (
        <div className="auth">
            <div className="header">
                <p>Let's Start with Login!</p>
            </div>
            <form onSubmit = {handleSubmit}>
                <div className="input-wrapper">
                    <i className="fas fa-at"></i>
                    <input value = {formData.email} onChange={handleFormChange("email")} type="email" required placeholder="Email"/>
                </div>
                <div className="input-wrapper">
                    <i className="fas fa-lock"></i>
                    <input value = {formData.password} onChange={handleFormChange("password")} type = {hidden ? "password" : "text"} required placeholder="Password"/>
                    {hidden ? 
                        <i className="fas fa-eye" onClick = {togglePassword}/> : 
                        <i className="fas fa-eye-slash" onClick = {togglePassword}></i>
                    }
                </div>
                <input type = "submit" value = "Login"/>
            </form>
            {/* <Link to = "/forgot" className = "mirror">Forgot Password?</Link> */}
            <Link to = "/signup" className = "mirror">Create Account</Link>
        </div>
    );
}

export default Login;