import React, {useEffect, useState} from 'react';
import client from '../api/api';

export default function Profile(){
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  async function load(){
    try{
      const res = await client.get('/users/me');
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    }catch(err){ console.error(err); }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h2>Profile</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
