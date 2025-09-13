import React from 'react'

export default function RequestCard({item}){
  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <div style={{fontWeight:700}}>{item.title}</div>
          <div style={{color:'#666'}}>{item.orgName} • {item.location?.city || 'Unknown'}</div>
        </div>
        <div style={{textAlign:'right'}}>{item.urgency}</div>
      </div>
      <div style={{marginTop:8}}>{item.description}</div>
      <div style={{marginTop:8}}><button>Offer help</button></div>
    </div>
  );
}
