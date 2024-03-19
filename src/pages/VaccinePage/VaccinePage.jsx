import React, { useContext } from "react";
import "./VaccinePage.style.css";
import { useState, useEffect } from "react";
import {
    getVaccines,
    filterVaccinesByAnimalName,
    filterVaccinesByDateRange,
} from "../../api/Vaccine";
import Vaccine from "../../components/Vaccine/Vaccine";
import { getAnimals } from "../../api/Animal";
import { getReports } from "../../api/Report";
import ErrorContext from "../../context/error/ErrorContext";
import { createVaccine } from "../../api/Vaccine";





const VaccinePage = () => {
    const { setShowAlert, setAlertMessage } = useContext(ErrorContext);
    const baseVaccine = {
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animal: {
            id: 0,
            name: "",
            species: "",
            breed: "",
            gender: "",
            colour: "",
            dateOfBirth: "",
        },
        report: {
            id: 0,
            title: "",
            diagnosis: "",
            price: 0,
        },
    };

    const [searchByName, setSearchByName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");

    useEffect(() => {
        if (searchByName) {
            filterVaccinesByAnimalName(searchByName).then(setVaccines);
        } else if (startDate && finishDate) {
            filterVaccinesByDateRange(startDate, finishDate).then(setVaccines);
        } else {
            getVaccines().then(setVaccines); // Tüm aşıları getir
        }
    }, [searchByName, startDate, finishDate]);

    const [vaccines, setVaccines] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [reports, setReports] = useState([]);
    const [vaccine, setVaccine] = useState(baseVaccine);

    useEffect(() => {
        getAnimals().then(setAnimals);
        getReports().then(setReports);
    }, []);

    const handleChange = (event) => {
        setVaccine({ ...vaccine, [event.target.name]: event.target.value });
    };

    const handleAnimalSelect = (event) => {
        setVaccine({
            ...vaccine,
            animal: { id: event.target.value || "" },
        });
    };

    const handleReportSelect = (event) => {
        setVaccine({
            ...vaccine,
            report: { id: event.target.value || "" },
        });
    };

    const handleAdd = () => {
        createVaccine(vaccine)
            .then((data) => {
                setVaccines((prev) => [...prev, data]);
                setVaccine({
                    name: "",
                    code: "",
                    protectionStartDate: "",
                    protectionFinishDate: "",
                    animal: {
                        id: "",
                        name: "",
                        species: "",
                        breed: "",
                        colour: "",
                        dateOfBirth: "",
                    },
                    report: {
                        id: "",
                        title: "",
                        diagnosis: "",
                        price: 0,
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
        <div className="vaccine-page-component">
            <h2>Vaccine Management</h2>
            
            <div className="vaccine-filter-animalName">
            <input
                type="text"
                placeholder="Hayvan Adına Göre Ara"
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
            />
            </div>
            <div className="vaccine-filter-dates">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Başlangıç Tarihi"
                />
                <input
                    type="date"
                    value={finishDate}
                    onChange={(e) => setFinishDate(e.target.value)}
                    placeholder="Bitiş Tarihi"
                />
            </div>

            <div className="vaccine-page-content">
                {vaccines.map((vaccine) => (
                    <Vaccine
                        key={vaccine.id}
                        vaccineProp={vaccine}
                        setVaccines={setVaccines}
                    />
                ))}
            </div>
            <div className="vaccine-add">
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={vaccine.name}
                    placeholder="Name"
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="code"
                    value={vaccine.code}
                    placeholder="Code"
                />
                <input
                    onChange={handleChange}
                    type="date"
                    name="protectionStartDate"
                    value={vaccine.protectionStartDate}
                    placeholder="Protection Start Date"
                />
                <input
                    onChange={handleChange}
                    type="date"
                    name="protectionFinishDate"
                    value={vaccine.protectionFinishDate}
                    placeholder="Protection Finish Date"
                />
                <select value={vaccine.animal.id || ""} onChange={handleAnimalSelect}>
                    <option value="">Select Animal</option>
                    {animals.map((animal) => (
                        <option key={animal.id} value={animal.id}>
                            {animal.name}
                        </option>
                    ))}
                </select>
                <select value={vaccine.report.id || ""} onChange={handleReportSelect}>
                    <option value="">Select Report</option>
                    {reports.map((report) => (
                        <option key={report.id} value={report.id}>
                            {report.title}
                        </option>
                    ))}
                </select>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
};

export default VaccinePage;
