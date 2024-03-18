import React, { useContext } from "react";
import { useState } from "react";
import {updateAvailableDate, deleteAvailableDate} from "../../api/AvailableDate"
import ErrorContext from "../../context/error/ErrorContext";
import "./AvailableDate.style.css";


const AvailableDate = ({ availableDateProp, setAvailableDates }) => {
  const {setShowAlert, setAlertMessage} = useContext(ErrorContext);
  const [availableDate, setAvailableDate] = useState(availableDateProp);

  const handleChange = (event) => {
    setAvailableDate((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleUpdate = () => {
    updateAvailableDate(availableDate).then((data) => {
      setAvailableDate(data);
    }).catch(error => {
      setShowAlert(true)
      setAlertMessage(error.response.data)
      setTimeout(() => {
          setShowAlert(false)
      }, 3000);
  })
  }

  const handleDelete = () => {
    deleteAvailableDate(availableDate.id).then(() => {
      setAvailableDates((prev) => prev.filter((object) => object.id !== availableDate.id));
    }).catch(error => {
      setShowAlert(true)
      setAlertMessage(error.response.data)
      setTimeout(() => {
          setShowAlert(false)
      }, 3000);
  })
  }


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

      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete} className="delete-button">Delete</button>

    </div>
  );
  
};

export default AvailableDate;
