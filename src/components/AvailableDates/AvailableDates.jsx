import React, { useEffect } from "react";
import { useState, useContext } from "react";
import {
    createAvailableDate,
    getAvailableDates,
} from "../../api/AvailableDate";
import AvailableDate from "../AvailableDate/AvailableDate";
import ErrorContext from "../../context/error/ErrorContext";
import "./AvailableDates.style.css";

const AvailableDates = ({ doctors }) => {
    const { setShowAlert, setAlertMessage } = useContext(ErrorContext);
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
            const selectedDoctor = doctors.find(
                (doc) => doc.id.toString() === value
            );
            setAvailableDate((prev) => ({
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
            setAvailableDate((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleAdd = () => {
        createAvailableDate(availableDate)
            .then((data) => {
                setAvailableDates((prev) => [...prev, data]);
                setAvailableDate({
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
            })
            .catch((error) => {
                setShowAlert(true);
                setAlertMessage(JSON.stringify(error.message));
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            });
    };

    return (
        <div className="available-dates-component">
            <h1>Available Dates</h1>
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
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};

export default AvailableDates;
