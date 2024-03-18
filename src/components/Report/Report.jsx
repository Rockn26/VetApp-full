import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getAppointments } from "../../api/Appointment";
import "./Report.style.css";
import ErrorContext from "../../context/error/ErrorContext";
import { updateReport, deleteReport} from "../../api/Report";

const Report = ({ reportProp, setReports }) => {
    const {setShowAlert, setAlertMessage} = useContext(ErrorContext);
    const [report, setReport] = useState(reportProp);

    const handleChange = (event) => {
        setReport({ ...report, [event.target.name]: event.target.value });
    };

    const handleSelect = (event) => {
        setReport({
            ...report,
            appointment: {
                ...report.appointment,
                id: event.target.value,
            },
        });
    };

    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        getAppointments().then((data) => {
            setAppointments(data);
        });
    }, []);

    const handleUpdate = () => {
        updateReport(report).then((data) => {
            setReport(data);
          }).catch(error => {
            setShowAlert(true)
            setAlertMessage(error.response.data)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        })
    }

    const handleDelete = () => {
        deleteReport(report.id).then(() => {
            setReports((prev) => prev.filter((object) => object.id !== report.id));
          }).catch(error => {
            setShowAlert(true)
            setAlertMessage(error.response.data)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        })
    }

    return (
        <div className="report-component">
            <input
                onChange={handleChange}
                type="text"
                name="title"
                value={report.title}
            />
            <input
                onChange={handleChange}
                type="text"
                name="diagnosis"
                value={report.diagnosis}
            />
            <input
                onChange={handleChange}
                type="number"
                name="price"
                value={report.price}
            />
            <select
                onChange={handleSelect}
                name="appointment"
                value={report.appointment.id}
            >
                <option value="">Select an appointment</option>
                {appointments.map((appointment) => {
                    return (
                        <option key={appointment.id} value={appointment.id}>
                            {appointment.appointmentDate}
                        </option>
                    );
                })}
            </select>
            <button onClick={handleUpdate} className="report-update-button">Update</button>
            <button onClick={handleDelete} className="report-delete-button">Delete</button>
        </div>
    );
};

export default Report;
