import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getReports } from "../../api/Report";
import "./ReportPage.style.css";
import Report from "../../components/Report/Report";
import { getAppointments} from "../../api/Appointment";
import { createReport } from "../../api/Report";
import ErrorContext from "../../context/error/ErrorContext";

const ReportPage = () => {
    const {setShowAlert, setAlertMessage} = useContext(ErrorContext);
    const [reports, setReports] = useState([]);
    useEffect(() => {
        getReports().then((data) => {
            setReports(data);
        });
    }, []);

    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        getAppointments().then((data) => {
            setAppointments(data);
        });
    }, []);

    const [report, setReport] = useState({
        title: "",
        diagnosis: "",
        price: 0,
        appointment: {
            id: 0,
            appointmentDate: "",
        },
    });

    const handleChange = (event) => {
        setReport({ ...report, [event.target.name]: event.target.value });
    };

    const handleAppointmentSelect = (event) => {
        const selectedAppointmentId = parseInt(event.target.value);
        const selectedAppontment = appointments.find(
            (report) => report.id === selectedAppointmentId
        );
        setReport({
            ...report,
            appointment: selectedAppontment,
        });
    };

    const handleAdd = () => {
        createReport(report)
            .then((data) => {
                setReports((prev) => [...prev, data]);
                setReport({
                    title: "",
                    diagnosis: "",
                    price: 0,
                    appointment: {
                        id: 0,
                        appointmentDate: "",
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
        <div className="report-page-component">
            <h2>Report Management</h2>
            <div className="report-page-content">
                <h2>Report List</h2>
                {reports.map((report) => (
                    <Report
                        key={report.id}
                        reportProp={report}
                        setReports={setReports}
                    />
                ))}
            </div>
            <div className="report-add">
                <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    value={report.title}
                    placeholder="Title"
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="diagnosis"
                    value={report.diagnosis}
                    placeholder="Diagnosis"
                />
                <input
                    onChange={handleChange}
                    type="number"
                    name="price"
                    value={report.price}
                    placeholder="Price"
                />
                <select onChange={handleAppointmentSelect} value={report.appointment.id || ""}>
                    <option value="">Select Appointment</option>
                    {appointments.map((appointment) => (
                        <option key={appointment.id} value={appointment.id}>
                            {appointment.appointmentDate}
                        </option>
                    ))}
                </select>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
};

export default ReportPage;
