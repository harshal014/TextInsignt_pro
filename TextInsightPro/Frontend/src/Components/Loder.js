import React from 'react'

export default function Loder() {
  return (
    <div className="loader-overlay" style={{height:"100vh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <img src="./output-onlinegiftools.gif" alt="Loading..." className="loader" />
    </div>
  )
}
