import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
    filterAnimalsByCustomerName,
    filterAnimalsByName,
    getAnimals,
} from "../../api/Animal";
import { getCustomers } from "../../api/Customer";
import { createAnimal } from "../../api/Animal";
import Animal from "../../components/Animal/Animal";
import "./AnimalPage.style.css";
import ErrorContext from "../../context/error/ErrorContext";


const AnimalPage = () => {
    const {setShowAlert, setAlertMessage} = useContext(ErrorContext);
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setfilteredAnimals] = useState([]);
    const [nameInput, setNameInput] = useState("");
    const [customerNameInput, setCustomerNameInput] = useState("");

    useEffect(() => {
        getAnimals().then((data) => {
            setAnimals(data);
            setfilteredAnimals(data);
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

    useEffect(() => {
        if (nameInput === "") {
            setfilteredAnimals(animals);
            return;
        }
        filterAnimalsByName(nameInput).then((data) => {
            setfilteredAnimals(data);
        });
    }, [nameInput]);

    useEffect(() => {
        if (customerNameInput === "") {
            setfilteredAnimals(animals);
            return;
        }
        filterAnimalsByCustomerName(customerNameInput).then((data) => {
            setfilteredAnimals(data);
        });
    }, [customerNameInput]);

    useEffect(() => {
        setfilteredAnimals(animals);
    }, [animals]);

    const handleNameInput = (event) => {
        const value = event.target.value;
        setNameInput(value);
    };

    const handleCustomerNameInput = (event) => {
        const value = event.target.value;
        setCustomerNameInput(value);
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
        }).catch(error => {
            setShowAlert(true)
            setAlertMessage(error.response.data)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        })
    }
    return (
        <div className="animal-page-component">
            <h1>Animal Management</h1>
            <div className="animal-page-content">
                <h2>Animal List</h2>
                <div className="filter-animalNames">
                <h4>Filter By Animal Name</h4>
                <input
                    onChange={handleNameInput}
                    type="text"
                    name="name"
                    value={nameInput}
                />
                <h4>Filter By Customer Name</h4>
                <input
                    onChange={handleCustomerNameInput}
                    type="text"
                    name="customerName"
                    value={customerNameInput}
                />
                </div>
                <p>
                    This is the animal list page. Here you can see all the
                    animals that are registered in the system.
                </p>
                {filteredAnimals.map((animal) => (
                    <Animal
                        key={animal.id}
                        animalProp={animal}
                        setAnimals={setAnimals}
                    />
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
                <button onClick={handleAdd}>Ekle</button>
            </div>
        </div>
    );
};

export default AnimalPage;
