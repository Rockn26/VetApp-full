import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.style.css'

const Navbar = () => {
  return (
    <div className='navbar-component'>
        <Link to='/'>Home</Link>
        <Link to='/animal'>Animal</Link>
        <Link to='/appointment'>Appointment</Link>
        <Link to='/customer'>Customer</Link>
        <Link to='/doctor'>Doctor</Link>
        <Link to='/report'>Report</Link>
        <Link to='/vaccine'>Vaccine</Link>
    </div>
  )
}

export default Navbar
