import React from "react";
import { useState } from "react";
import "./Customer.style.css";
import { deleteCustomer, updateCustomer } from "../../api/Customer";

const Customer = ({ customerProp , setCustomers }) => {
  const [customer, setCustomer] = useState(customerProp);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateCustomer(customer).then((data) => {
      setCustomer(data);
    });
  };

  const handleDelete = () => {
    deleteCustomer(customer.id).then(() => {
        setCustomers(prev =>  prev.filter(object => object.id !== customer.id))
    });
  };

  return (
    <div className="customer-component">
      <input
        onChange={handleChange}
        type="text"
        name="name"
        value={customer.name}
      />
      <input
        onChange={handleChange}
        type="text"
        name="email"
        value={customer.email}
      />
      <input
        onChange={handleChange}
        type="text"
        name="phone"
        value={customer.phone}
      />
      <input
        onChange={handleChange}
        type="text"
        name="city"
        value={customer.city}
      />
      <input
        onChange={handleChange}
        type="text"
        name="address"
        value={customer.address}
      />

      <button onClick={handleUpdate} className="customer-update-button">
        Update
      </button>
      <button onClick={handleDelete} className="customer-delete-button">
        Sil
      </button>
    </div>
  );
};

export default Customer;
