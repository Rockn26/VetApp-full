import React from 'react'
import './Updater.style.css'


const Updater = ({handlerFunction}) => {

  return (
    <div className='entity-updater'>
      <button onClick={handlerFunction} className="doctor-update-button">
        Update
      </button>
    </div>
  )
}

export default Updater
