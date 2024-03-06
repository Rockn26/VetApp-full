import React from "react";
import { useState } from "react";
import "./Doctor.style.css";
import Deleter from "../Deleter/Deleter";
import { handleDelete, handleUpdate } from "../../handler/DoctorHandler";
import Updater from "../Updater/Updater";




const Doctor = ({ doctorProp, setDoctors }) => {
  const [doctor, setDoctor] = useState(doctorProp);

  const handleChange = (event) => {
    setDoctor({ ...doctor, [event.target.name]: event.target.value });
  };

  

  

  return (
    <div className="doctor-component">
      <input
        onChange={handleChange}
        type="text"
        name="name"
        value={doctor.name}
      />
      <input
        onChange={handleChange}
        type="text"
        name="phone"
        value={doctor.phone}
      />
      <input
        onChange={handleChange}
        type="text"
        name="email"
        value={doctor.email}
      />
      <input
        onChange={handleChange}
        type="text"
        name="address"
        value={doctor.address}
      />
      <input
        onChange={handleChange}
        type="text"
        name="city"
        value={doctor.city}
      />

      <Updater handlerFunction={() => handleUpdate(doctor, setDoctor)}/>

      <Deleter handlerFunction={() => handleDelete(doctor, setDoctors)}/>
     
    </div>
  );
};
export default Doctor;
