import axios from "axios";

export const getAppointments = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "appointments"
    );
    return data;
};

export const deleteAppointment = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `appointments/` + id
    );

    return data;
};

export const createAppointment = async (appointment) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `appointments`,
        appointment
    );

    return data;
};

export const updateAppointment = async (appointment) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `appointments`,
        appointment
    );

    return data;
};

export const filterAppointmentsByDoctorNameAndDateBetween = async (
    doctorName,
    startDate,
    finishDate
) => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL +
            `appointments/doctor-and-dates?doctorName=${doctorName}&startDate=${startDate}&finishDate=${finishDate}`
    );
    return data;
};

export const filterAppointmentsByAnimalNameAndDateBetween = async (
    animalName,
    startDate,
    finishDate
) => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL +
            `appointments/animal-and-dates?animalName=${animalName}&startDate=${startDate}&finishDate=${finishDate}`
    );
    return data;
};


