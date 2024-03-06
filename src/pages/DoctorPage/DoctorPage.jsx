import React from "react";
import { useState, useEffect } from "react";
import { createDoctor, getDoctors } from "../../api/Doctor";
import "./DoctorPage.style.css";
import Doctor from "../../components/Doctor/Doctor";
import { handleAdd } from "../../handler/DoctorHandler";
import Adder from "../../components/Adder/Adder";



const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getDoctors().then((data) => {
      setDoctors(data);
    });
  }, []);

  const [doctor, setDoctor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const handleChange = (event) => {
    setDoctor({ ...doctor, [event.target.name]: event.target.value });
  }

  

  return (
    <div className="doctor-page-component">
      <h2>Doctor Management</h2>
      <div className="doctor-page-content">
        <h2>Doctor List</h2>
        <p>
          This is the doctor list page. Here you can see all the doctors that
          are registered in the system.
        </p>
        {doctors.map((doctor) => (
          <Doctor key={doctor.id} doctorProp={doctor} setDoctors={setDoctors} />
        ))}
      </div>
      <div className="doctor-add">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={doctor.name}
          placeholder="Name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="phone"
          value={doctor.phone}
          placeholder="Phone"
        />
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={doctor.email}
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="text"
          name="address"
          value={doctor.address}
          placeholder="Address"
        />
        <input
          onChange={handleChange}
          type="text"
          name="city"
          value={doctor.city}
          placeholder="City"
        />
        
        <Adder handlerFunction={() => {handleAdd(doctor, setDoctor, setDoctors)}}/>

      </div>
    /* available date buraya gelecek */
    </div>

  );
};

export default DoctorPage;
