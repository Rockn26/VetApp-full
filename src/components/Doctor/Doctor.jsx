import React, { useContext } from "react";
import { useState } from "react";
import "./Doctor.style.css";
import { updateDoctor, deleteDoctor } from "../../api/Doctor";
import ErrorContext from "../../context/error/ErrorContext";

const Doctor = ({ doctorProp, setDoctors }) => {
    const {setShowAlert, setAlertMessage} = useContext(ErrorContext)
    const [doctor, setDoctor] = useState(doctorProp);

    const handleChange = (event) => {
        setDoctor({ ...doctor, [event.target.name]: event.target.value });
    };

    const handleUpdate = () => {
        updateDoctor(doctor)
            .then((data) => {
                setDoctor(data);
            })
            .catch((error) => {
                setShowAlert(true);
                setAlertMessage(error.response.data);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            });
    };

    const handleDelete = () => {
      deleteDoctor(doctor.id).then(() => {
        setDoctors((prev) => prev.filter((object) => object.id !== doctor.id));
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertMessage(error.response.data);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    });
    }

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

            <button onClick={handleUpdate} className="doctor-update-button">Update</button>
            <button onClick={handleDelete} className="doctor-delete-button">Delete</button>
        </div>
    );
};
export default Doctor;
