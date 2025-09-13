import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const nav = useNavigate();
  function logout(){
    localStorage.removeItem('token'); localStorage.removeItem('user'); nav('/');
  }
  return (
    <div className="nav">
      <div className="brand"><Link to="/">NGO Bridge</Link></div>
      <div className="links">
        {user?<>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Sign out</button>
        </>:<>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </>}
      </div>
    </div>
  );
}
