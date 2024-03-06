import React from 'react'
import './Adder.style.css'

const Adder = ({handlerFunction}) => {
  return (
    <div>
      <button onClick={handlerFunction} className="entity-add-button">
          Add
        </button>
    </div>
  )
}

export default Adder
