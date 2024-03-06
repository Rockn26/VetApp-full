import React from "react";
import Updater from "../Updater/Updater";
import { handleDelete, handleUpdate } from "../../handler/AvailableDateHandler";
import { useState } from "react";
import Deleter from "../Deleter/Deleter";

const AvailableDate = ({ availableDateProp, setAvailableDates }) => {
  const [availableDate, setAvailableDate] = useState(availableDateProp);

  const handleChange = (event) => {
    setAvailableDate((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };


  return (
    <div className="available-date-component">
      <input
        onChange={handleChange}
        type="date"
        name="availableDate"
        value={availableDate.availableDate}
      />

    
      <div>
        {availableDate.doctor.name}
      </div>
  
      <Updater handlerFunction={() => handleUpdate(availableDate, setAvailableDate)}/>
      <Deleter handlerFunction={() => handleDelete(availableDate, setAvailableDates)}/>
    </div>
  );
  
};

export default AvailableDate;
