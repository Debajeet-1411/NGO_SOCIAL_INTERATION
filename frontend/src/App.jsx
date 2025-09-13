import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PostRequest from './pages/PostRequest'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<PostRequest />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}
