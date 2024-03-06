import axios from "axios";

export const getAvailableDates = async () => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_URL + "availableDates");
    return data;
    }


export const deleteAvailableDate = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `availableDates/` + id
    );

    return data;
};

export const createAvailableDate = async (availableDate) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `availableDates`,
        availableDate
    );

    return data;
};

export const updateAvailableDate = async (availableDate) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `availableDates`,
        availableDate
    );

    return data;
};
