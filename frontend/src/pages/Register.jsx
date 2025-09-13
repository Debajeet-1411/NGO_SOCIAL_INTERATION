import React, {useState} from 'react';
import client from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState('');
  const [password,setPassword]=useState(''); const [role,setRole]=useState('donor');
  const [orgName,setOrgName] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const payload = { name, email, password, role, orgName };
      const res = await client.post('/auth/signup', payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/dashboard');
    }catch(err){ alert(err.response?.data?.msg || 'Register failed'); }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="donor">Donor</option>
          <option value="ngo">NGO</option>
          <option value="restaurant">Restaurant</option>
          <option value="volunteer">Volunteer</option>
        </select>
        {role==='ngo' && <input value={orgName} onChange={e=>setOrgName(e.target.value)} placeholder="Organization name (NGO only)" />}
        <button>Create account</button>
      </form>
    </div>
  );
}
