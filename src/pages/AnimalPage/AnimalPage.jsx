import React from "react";
import { useState, useEffect } from "react";
import { getAnimals } from "../../api/Animal";
import { getCustomers } from "../../api/Customer";
import { createAnimal } from "../../api/Animal";
import Animal from "../../components/Animal/Animal";
import "./AnimalPage.style.css";

const AnimalPage = () => {
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
    });
  }, []);

  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
    });
  }, []);

  const [animal, setAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
    },
  });

  const handleChange = (event) => {
    setAnimal({ ...animal, [event.target.name]: event.target.value });

  };

  const handleAdd = () => {
    createAnimal(animal).then((data) => {
      setAnimals((prev) => [...prev, data]);
      setAnimal({
        name: "",
        species: "",
        breed: "",
        gender: "",
        colour: "",
        dateOfBirth: "",
        customer: {
          id: 0,
          name: "",
          email: "",
          phone: "",
          city: "",
          address: "",
        },
      });
    });
  };

  return (
    <div className="animal-page-component">
      <h2>Animal Management</h2>
      <div className="animal-page-content">
        <h2>Animal List</h2>
        <p>
          This is the animal list page. Here you can see all the animals that
          are registered in the system.
        </p>
        {animals.map((animal) => (
          <Animal key={animal.id} animalProp={animal} setAnimals={setAnimals} />
        ))}
      </div>
      <div className="animal-add">
        <input
          onChange={handleChange}
          type="text"
          placeholder="name"
          value={animal.name}
          name="name"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="species"
          value={animal.species}
          name="species"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="breed"
          value={animal.breed}
          name="breed"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="gender"
          value={animal.gender}
          name="gender"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="colour"
          value={animal.colour}
          name="colour"
        />
        <input
          onChange={handleChange}
          type="date"
          placeholder="dateOfBirth"
          value={animal.dateOfBirth}
          name="dateOfBirth"
        />
        <select
          onChange={(event) => {
            const selectedCustomerId = parseInt(event.target.value);
            const selectedCustomer = customers.find(
              (customer) => customer.id === selectedCustomerId
            );
            setAnimal({ ...animal, customer: selectedCustomer });
          }}
        >
          <option value={null}>Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default AnimalPage;
