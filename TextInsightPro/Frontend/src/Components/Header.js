import React from 'react'

function Header() {
  return (
    <nav className="navbar navbar-light bg-light" style={{backgroundColor:"#e3f2fd"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBhCnnbdkWxxNKwbc2jyP3cXtf7AYbqMPnMA&usqp=CAU" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
     {" "}TextInsight <strong>Pro</strong>
    </a>
  </div>
    </nav>
  )
}

export default Header
