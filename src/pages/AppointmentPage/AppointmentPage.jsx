import React, { useContext, useEffect } from "react";
import "./AppointmentPage.style.css";
import { useState } from "react";
import {
    filterAppointmentsByDoctorNameAndDateBetween,
    filterAppointmentsByAnimalNameAndDateBetween,
    getAppointments,
} from "../../api/Appointment";
import Appointment from "../../components/Appointment/Appointment";
import { getDoctors } from "../../api/Doctor";
import { getAnimals } from "../../api/Animal";
import { createAppointment } from "../../api/Appointment";
import ErrorContext from "../../context/error/ErrorContext";

const AppointmentPage = () => {
    const { setShowAlert, setAlertMessage } = useContext(ErrorContext);
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        getAppointments().then((data) => {
            setAppointments(data);
        });
    }, []);

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        getDoctors().then((data) => {
            setDoctors(data);
        });
    }, []);

    const [animals, setAnimals] = useState([]);
    useEffect(() => {
        getAnimals().then((data) => {
            setAnimals(data);
        });
    }, []);

    const [appointment, setAppointment] = useState({
        appointmentDate: "",
        doctor: {
            id: 0,
            name: "",
            phone: "",
            email: "",
            address: "",
            city: "",
        },
        animal: {
            id: 0,
            name: "",
            type: "",
            breed: "",
            colour: "",
            dateOfBirth: "",
            customer: {
                id: 0,
                name: "",
                phone: "",
                email: "",
                address: "",
                city: "",
            },
        },
    });

    const handleChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const [filteredAppointments, setFilteredAppointments] =
        useState(appointments);
    useEffect(() => {
        setFilteredAppointments(appointments);
    }, [appointments]);
    const searchForDoctor = { doctorName: "", startDate: "", finishDate: "" };
    const [doctorFilter, setDoctorFilter] = useState(searchForDoctor);
    const handleFilterDoctor = (event) => {
        const updatedFilter = {
            ...doctorFilter,
            [event.target.name]: event.target.value,
        };

        setDoctorFilter(updatedFilter);

        // Güncellenmiş filtre değerlerini kullanarak fonksiyonu çağırın
        filterAppointmentsByDoctorNameAndDateBetween(
            updatedFilter.doctorName,
            updatedFilter.startDate,
            updatedFilter.finishDate
        )
            .then((data) => {
                setFilteredAppointments(data);
            })
            .catch((error) => {
                setFilteredAppointments(appointments);
            });
    };

    const searchForAnimal = { animalName: "", startDate: "", finishDate: "" };
    const [animalFilter, setAnimalFilter] = useState(searchForAnimal);
    const handleFilterAnimal = (event) => {
        const updatedFilter = {
            ...animalFilter,
            [event.target.name]: event.target.value,
        };

        setAnimalFilter(updatedFilter);

        filterAppointmentsByAnimalNameAndDateBetween(
            updatedFilter.animalName,
            updatedFilter.startDate,
            updatedFilter.finishDate
        )
            .then((data) => {
                setFilteredAppointments(data);
            })
            .catch((error) => {
                setFilteredAppointments(appointments);
            });
    };

    const handleAdd = () => {
        createAppointment(appointment)
            .then((data) => {
                setAppointments((prev) => [...prev, data]);
                setAppointment({
                    appointment: {
                        appointmentDate: "",
                    },
                    doctor: {
                        id: 0,
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        city: "",
                    },
                    animal: {
                        id: 0,
                        name: "",
                        type: "",
                        breed: "",
                        colour: "",
                        dateOfBirth: "",
                    },
                });
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
        <div className="appointment-page-content">
            <h1>Appointment Page</h1>
            <div className="appointment-doctor-filter">
                <input
                    type="text"
                    placeholder="Doctor Name"
                    name="doctorName"
                    onChange={handleFilterDoctor}
                    value={doctorFilter.doctorName}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    onChange={handleFilterDoctor}
                    value={doctorFilter.startDate}
                />
                <input
                    type="date"
                    placeholder="Finish Date"
                    name="finishDate"
                    onChange={handleFilterDoctor}
                    value={doctorFilter.finishDate}
                />
            </div>
            <div className="appointment-animal-filter">
                <input
                    type="text"
                    placeholder="Animal Name"
                    name="animalName"
                    onChange={handleFilterAnimal}
                    value={animalFilter.animalName}
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    onChange={handleFilterAnimal}
                    value={animalFilter.startDate}
                />
                <input
                    type="date"
                    placeholder="Finish Date"
                    name="finishDate"
                    onChange={handleFilterAnimal}
                    value={animalFilter.finishDate}
                />
            </div>
            <div className="appointment-content">
                {filteredAppointments.map((appointment) => {
                    return (
                        <Appointment
                            key={appointment.id}
                            appointmentProp={appointment}
                            setAppointments={setAppointments}
                        />
                    );
                })}
            </div>
            <div className="appointment-add">
                <input
                    onChange={handleChange}
                    type="datetime-local"
                    placeholder="Appointment Date"
                    name="appointmentDate"
                    value={appointment.appointmentDate || ""}
                />

                <select
                    onChange={(event) => {
                        const selectedDoctorId = parseInt(event.target.value);
                        const selectedDoctor = doctors.find(
                            (obj) => obj.id === selectedDoctorId
                        );
                        setAppointment({
                            ...appointment,
                            doctor: selectedDoctor,
                        });
                    }}
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
                    onChange={(event) => {
                        const selectedAnimalId = parseInt(event.target.value);
                        const selectedAnimal = animals.find(
                            (obj) => obj.id === selectedAnimalId
                        );
                        setAppointment({
                            ...appointment,
                            animal: selectedAnimal,
                        });
                    }}
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
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
};

export default AppointmentPage;
