import axios from "axios";

export const getReports = async () => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_URL + "reports");
    return data;
    }


export const deleteReport = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `reports/` + id
    );

    return data;
};

export const createReport = async (report) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `reports`,
        report
    );

    return data;
};

export const updateReport = async (report) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `reports`,
        report
    );

    return data;
};
