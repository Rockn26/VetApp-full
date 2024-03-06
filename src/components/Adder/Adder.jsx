import React from 'react'
import './Adder.style.css'

const Adder = ({handlerFunction}) => {
  return (
    <div>
      <button onClick={handlerFunction} className="doctor-add-button">
          Add Doctor
        </button>
    </div>
  )
}

export default Adder
