import React, { useEffect } from "react";
import { useState } from "react";
import { getAvailableDates } from "../../api/AvailableDate";
import AvailableDate from "../AvailableDate/AvailableDate";
import { handleAdd } from "../../handler/AvailableDateHandler";
import Adder from "../Adder/Adder";



const AvailableDates = ({doctors}) => {
  const [availableDates, setAvailableDates] = useState([]);
  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDates(data);
    });
  }, []);

  const [availableDate, setAvailableDate] = useState({
    availableDate: "",
    doctor: {
      id: 0,
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "doctor") {
      // Doktor seçimi için özel bir işleyici
      const selectedDoctor = doctors.find(doc => doc.id.toString() === value);
      setAvailableDate(prev => ({
        ...prev,
        doctor: selectedDoctor || {
          id: 0,
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        },
      }));
    } else {
      // Diğer tüm inputlar için genel işleyici
      setAvailableDate(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  }
  

  return (
    <div className="available-dates-component">
      <h2>Available Dates</h2>
      <div>
        {availableDates.map((availableDate) => (
          <AvailableDate
            key={availableDate.id}
            availableDateProp={availableDate}
            setAvailableDates={setAvailableDates}
          />
        ))}
      </div>
      <input
        onChange={handleChange}
        type="date"
        name="availableDate"
        value={availableDate.availableDate}
      /> 
        <select
            onChange={handleChange}
            name="doctor"
            value={availableDate.doctor.id}
            >
            <option value="0">Select Doctor</option>
            {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                {doctor.name}
                </option>
            ))}
        </select>
      <Adder
        handlerFunction={() =>
          handleAdd(availableDate, setAvailableDate, setAvailableDates)
        }
      />
    </div>
  );
};

export default AvailableDates;