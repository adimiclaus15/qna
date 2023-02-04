// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/index.scss';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router';
import router from './utils/router';
import Navbar from './components/navbar/Navbar';
import Helmet from "./components/Helmet"
import AlertTemplate from "react-alert-template-basic";
import {positions, Provider as AlertProvider} from "react-alert";
import "react-responsive-modal/styles.css";
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const alert_options = {
  timeout: 4 * 1000,
  position: positions.TOP_CENTER
}

root.render(
  // <React.StrictMode>
    <AlertProvider template = {AlertTemplate} {...alert_options}>
      <AuthProvider>
        <Helmet type = "theme--dark"/>
        <RouterProvider router = {router}/>
      </AuthProvider>
    </AlertProvider>
  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
