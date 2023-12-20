import React, { useState } from 'react'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogsComponent from './LogsComponent';
import { Navigate } from 'react-router-dom';

function App() {

  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logs" element={<LogsComponent />} />
        {/* You can add more routes as needed */}
      </Routes>
    </Router>

  )
}

export default App
