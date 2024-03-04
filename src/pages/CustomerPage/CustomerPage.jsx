import React, { useEffect } from "react";
import { useState } from "react";
import { getCustomers } from "../../api/Customer";
import "./CustomerPage.style.css";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
    });

  }, []);
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
          <div key={customer.id} className="customer-item">
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <p>{customer.city}</p>
            <p>{customer.address}</p>
          </div>
        ))}
      </div>
      <div className="customer-add">
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="email" placeholder="email" />
        <input type="text" name="phone" placeholder="phone" />
        <input type="text" name="city" placeholder="city" />
        <input type="text" name="address" placeholder="address" />
      </div>
    </div>
  );
};

export default CustomerPage;
