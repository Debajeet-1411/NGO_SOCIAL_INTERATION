import React, {useEffect, useState} from 'react';
import client from '../api/api';
import RequestCard from '../components/RequestCard';

export default function Home(){
  const [items, setItems] = useState([]);
  const [city, setCity] = useState('');

  async function load(){
    try{
      const res = await client.get(`/requests${city?`?city=${encodeURIComponent(city)}`:''}`);
      setItems(res.data);
    }catch(e){ console.error(e); alert('Failed to fetch'); }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h2>Requests Feed</h2>
      <div style={{marginBottom:12}}>
        <input placeholder="Filter by city" value={city} onChange={e=>setCity(e.target.value)} />
        <button onClick={load}>Filter</button>
      </div>
      <div style={{display:'grid',gap:12}}>
        {items.length? items.map(it=> <RequestCard key={it._id} item={it} />) : <div>No requests</div>}
      </div>
    </div>
  );
}
