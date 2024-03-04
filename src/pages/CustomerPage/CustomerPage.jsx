import React, { useEffect } from "react";
import { useState } from "react";
import { createCustomer, getCustomers } from "../../api/Customer";
import "./CustomerPage.style.css";
import Customer from "../../components/Customer/Customer";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
    });
  }, []);

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

  const handleAdd = () => {
    createCustomer(customer).then((data) => {
      setCustomers(prev => [...prev, data]);
      setCustomer({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
      });
    }
    );
  };

  return (
    <div className="customer-page-component">
      <h2>Customer Management</h2>
      <div className="customer-page-content">
        <h2>Customer List</h2>
        <p>
          This is the customer list page. Here you can see all the customers
          that are registered in the system.
        </p>
        {customers.map((customer) => (
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
        <button onClick={handleAdd} className="customer-add-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default CustomerPage;
