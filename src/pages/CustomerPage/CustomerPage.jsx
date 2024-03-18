import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
    createCustomer,
    filterCustomersByName,
    getCustomers,
} from "../../api/Customer";
import "./CustomerPage.style.css";
import Customer from "../../components/Customer/Customer";
import ErrorContext from "../../context/error/ErrorContext";


const CustomerPage = () => {
    const {setShowAlert, setAlertMessage} = useContext(ErrorContext);
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        getCustomers().then((data) => {
            setCustomers(data);
            setFilteredCustomers(data);
        });
    }, []);
    useEffect(() => {
        setFilteredCustomers(customers);
    }, [customers]);
    useEffect(() => {
        if (filter === "") {
            return;
        }
        filterCustomersByName(filter).then((data) => {
            setFilteredCustomers(data);
        });
    }, [filter]);

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setFilter(value);
        if (!value.trim()) {
            // Filtre boşsa tüm müşterileri tekrar yükle
            setFilteredCustomers(customers);
        } else {
            // Değilse filtreleme yap
            filterCustomersByName(value)
                .then(setFilteredCustomers)
                .catch((error) => console.error(error));
        }
    };

    const handleAdd = () => {
        createCustomer(customer).then((data) => {
            setCustomers((prev) => [...prev, data]);
            setCustomer({
                name: "",
                email: "",
                phone: "",
                city: "",
                address: "",
              });
        }).catch(error => {
            setShowAlert(true)
            setAlertMessage(error.response.data)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        })
    }

    return (
        <div className="customer-page-component">
            <h1>Customer Management</h1>
            <div className="customer-page-content">
                <h2>Customer List</h2>
                <div className="filter-customerName">
                <h4>Filter By Name</h4>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={handleInputChange}
                    value={filter}
                />
                </div>
                <p>
                    This is the customer list page. Here you can see all the
                    customers that are registered in the system.
                </p>
                {filteredCustomers?.map((customer) => (
                    <Customer
                        key={customer.id}
                        customerProp={customer}
                        setCustomers={setCustomers}
                    />
                ))}
            </div>
            <div className="customer-add">
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="name"
                    value={customer.name}
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="email"
                    placeholder="email"
                    value={customer.email}
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    placeholder="phone"
                    value={customer.phone}
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="city"
                    placeholder="city"
                    value={customer.city}
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="address"
                    placeholder="address"
                    value={customer.address}
                />
                <button onClick={handleAdd}>Ekle</button>
            </div>
        </div>
    );
};

export default CustomerPage;
