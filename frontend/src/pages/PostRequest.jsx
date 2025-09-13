import React, {useState} from 'react';
import client from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function PostRequest(){
  const [title,setTitle]=useState(''); const [desc,setDesc]=useState('');
  const [category,setCategory]=useState('food'); const [urgency,setUrgency]=useState('medium');
  const [city,setCity]=useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const token = localStorage.getItem('token');
      if(!token) return nav('/login');
      const payload = { title, description:desc, category, urgency, city };
      await client.post('/requests', payload);
      alert('Request posted');
      nav('/');
    }catch(err){ console.error(err); alert('Failed to post'); }
  }

  return (
    <div>
      <h2>Create Request</h2>
      <form onSubmit={submit}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" required />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="food">Food</option>
          <option value="funds">Funds</option>
          <option value="clothes">Clothes</option>
          <option value="medical">Medical</option>
        </select>
        <select value={urgency} onChange={e=>setUrgency(e.target.value)}>
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" />
        <button>Publish</button>
      </form>
    </div>
  );
}
