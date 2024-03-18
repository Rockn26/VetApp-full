import React, { useContext, useEffect } from "react";
import "./Vaccine.style.css";
import { useState } from "react";
import { getAnimals } from "../../api/Animal";
import { getReports } from "../../api/Report";
import { updateVaccine, deleteVaccine } from "../../api/Vaccine";
import ErrorContext from "../../context/error/ErrorContext";

const Vaccine = ({ vaccineProp, setVaccines }) => { 
    const { setShowAlert, setAlertMessage } = useContext(ErrorContext);
    const [vaccine, setVaccine] = useState(vaccineProp);

    const handleChange = (event) => {
        setVaccine({ ...vaccine, [event.target.name]: event.target.value });
    };

    const [reports, setReports] = useState([]);
    useEffect(() => {
        getReports().then((data) => {
            setReports(data);
        });
    }, []);

    const [animals, setAnimals] = useState([]);
    useEffect(() => {
        getAnimals().then((data) => {
            setAnimals(data);
        });
    }, []);

    useEffect(() => {
        setVaccine(vaccineProp);
    }, [vaccineProp]);

    const handleAnimalChange = (event) => {
        const selectedAnimal = animals.find(
            (obj) => obj.id === parseInt(event.target.value)
        );
        setVaccine({ ...vaccine, animal: selectedAnimal });
    };

    const handleReportChange = (event) => {
        const selectedReport = reports.find(
            (obj) => obj.id === parseInt(event.target.value)
        );
        setVaccine({ ...vaccine, report: selectedReport });
    };

    const handleUpdate = () => {
        updateVaccine(vaccine)
            .then((data) => {
                setVaccine(data);
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
        deleteVaccine(vaccine.id)
            .then(() => {
                setVaccines((prev) =>
                    prev.filter((object) => object.id !== vaccine.id)
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
        <div className="vaccine-component">
            <input
                onChange={handleChange}
                type="text"
                name="name"
                value={vaccine.name}
            />
            <input
                onChange={handleChange}
                type="text"
                name="code"
                value={vaccine.code}
            />
            <input
                onChange={handleChange}
                type="date"
                name="protectionStartDate"
                value={vaccine.protectionStartDate}
            />
            <input
                onChange={handleChange}
                type="date"
                name="protectionFinishDate"
                value={vaccine.protectionFinishDate}
            />

            <select
                onChange={handleAnimalChange}
                name="animal"
                type="text"
                value={vaccine.animal?.id}
            >
                <option value="">Select an animal</option>
                {animals.map((animal) => {
                    return (
                        <option key={animal.id} value={animal.id}>
                            {animal.name}
                        </option>
                    );
                })}
            </select>
            <select
                onChange={handleReportChange}
                name="report"
                type="text"
                value={vaccine.report?.id}
            >
                <option value="">Select a report</option>
                {reports.map((report) => {
                    return (
                        <option key={report.id} value={report.id}>
                            {report.title}
                        </option>
                    );
                })}
            </select>
            <button onClick={handleUpdate} className="vaccine-update-button">Update</button>
            <button onClick={handleDelete} className="vaccine-delete-button">Delete</button>
        </div>
    );
};

export default Vaccine;

