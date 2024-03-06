import React from 'react'
import './Deleter.style.css'


const Deleter = ({handlerFunction}) => {
  return (
    <div>
       <button onClick={handlerFunction} className="entity-deleter">
        Delete
      </button>
    </div>
  )
}

export default Deleter
