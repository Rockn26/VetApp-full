import React, { useContext, useEffect } from "react";
import "./Appointment.style.css";
import { useState } from "react";
import { getDoctors } from "../../api/Doctor";
import { getAnimals } from "../../api/Animal";
import { updateAppointment, deleteAppointment } from "../../api/Appointment";
import ErrorContext from "../../context/error/ErrorContext";

const Appointment = ({ appointmentProp, setAppointments }) => {
  const {setShowAlert, setAlertMessage} = useContext(ErrorContext);
    const [appointment, setAppointment] = useState(appointmentProp);
    const [doctors, setDoctors] = useState([]);
    const [animals, setAnimals] = useState([]);

    const handleChange = (event) => {
        setAppointment({
            ...appointment,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(() => {
        getDoctors().then((data) => {
            setDoctors(data);
        });
    }, []);

    useEffect(() => {
        getAnimals().then((data) => {
            setAnimals(data);
        });
    }, []);

    const handleSelectDoctor = (event) => {
        const selectedDoctor = doctors.find(
            (obj) => obj.id === parseInt(event.target.value)
        );
        setAppointment({ ...appointment, [event.target.name]: selectedDoctor });
    };

    const handleSelectAnimal = (event) => {
        const selectedAnimal = animals.find(
            (obj) => obj.id === parseInt(event.target.value)
        );
        setAppointment({ ...appointment, [event.target.name]: selectedAnimal });
    };

    const handleUpdate = () => {
        updateAppointment(appointment)
            .then((data) => {
                setAppointment(data);
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
        deleteAppointment(appointment.id)
            .then(() => {
                setAppointments((prev) =>
                    prev.filter((object) => object.id !== appointment.id)
                );
            })
            .catch((error) => {
                setShowAlert(true);
                setAlertMessage(error.response.data);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            });
    };

    return (
        <div className="appointment-content">
        
            <input
                onChange={handleChange}
                type="datetime-local"
                name="appointmentDate"
                value={appointment.appointmentDate}
            />

            <select
                value={appointment.doctor?.id || ""}
                onChange={handleSelectDoctor}
                name="doctor"
            >
                <option value="">Select doctor</option>
                {doctors.map((doctor) => {
                    return (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    );
                })}
            </select>
            <select
                value={appointment.animal?.id || ""}
                onChange={handleSelectAnimal}
                name="animal"
            >
                <option value="">Select animal</option>
                {animals.map((animal) => {
                    return (
                        <option key={animal.id} value={animal.id}>
                            {animal.name}
                        </option>
                    );
                })}
            </select>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Appointment;
