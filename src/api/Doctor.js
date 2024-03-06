import axios from "axios";

export const getDoctors = async () => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_URL + "doctors");
    return data;
    }


export const deleteDoctor = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `doctors/` + id
    );

    return data;
};

export const createDoctor = async (doctor) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `doctors`,
        doctor
    );

    return data;
};

export const updateDoctor = async (doctor) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `doctors`,
        doctor
    );

    return data;
};
