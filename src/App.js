import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route ,useNavigate} from 'react-router-dom';
import LoginPage from './LOGIN/LoginPage';
import ResetPassword from './LOGIN/ResetPasswordPage';
import ForgotPassword from './LOGIN/ForgotPasswordPage';
import CreateUserContainer from './createuserContainer';

function App() {

 
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/ResetPassword/:resetToken" element={<ResetPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/CreateUserPage" element={<CreateUserContainer/>} />
     
    
    </Routes>
  );
}

export default App;
