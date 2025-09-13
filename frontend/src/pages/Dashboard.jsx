import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div>
      <h2>Dashboard</h2>
      <div>Welcome, {user?.name || 'Guest'}</div>
      <div style={{marginTop:12}}>
        <Link to="/post"><button>Post a Request</button></Link>
        <Link to="/profile"><button>Profile</button></Link>
      </div>
    </div>
  );
}
