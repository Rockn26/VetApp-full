import axios from "axios";

export const getCustomers = async () => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_URL + "customers");
    console.log(data);
    return data;
    }


export const deleteCustomer = async (id) => {
    const { data } = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `customers/` + id
    );

    return data;
};

export const createCustomer = async (customer) => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `customers`,
        customer
    );

    return data;
};

export const updateCustomer = async (customer) => {
    const { data } = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `customers`,
        customer
    );

    return data;
};
