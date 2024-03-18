import React, { useEffect } from "react";
import "./Animal.style.css";
import { useState } from "react";
import { getCustomers } from "../../api/Customer";
import { updateAnimal, deleteAnimal } from "../../api/Animal";
import ErrorContext from "../../context/error/ErrorContext";
import { useContext } from "react";

const Animal = ({ animalProp, setAnimals }) => {
    const {setShowAlert, setAlertMessage} = useContext(ErrorContext);
    const [animal, setAnimal] = useState(animalProp);
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        getCustomers().then((data) => {
            setCustomers(data);
        });
    }, []);

    const handleChange = (event) => {
        setAnimal({ ...animal, [event.target.name]: event.target.value })
    };

    const handleSelectCustomer = (event) => {
        const selectedCustomer = customers.find(
            (obj) => obj.id === parseInt(event.target.value)
        );
        setAnimal({ ...animal, [event.target.name]: selectedCustomer });
        
    }

    const handleUpdate = () => {
        updateAnimal(animal).then((data) => {
            setAnimal(data);
          }).catch(error => {
            setShowAlert(true)
            setAlertMessage(error.response.data)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        })
    }

    const handleDelete = () => {
        deleteAnimal(animal.id).then(() => {
            setAnimals((prev) => prev.filter((object) => object.id !== animal.id));
          }).catch(error => {
            setShowAlert(true)
            setAlertMessage(error.response.data)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        })
    }

    return (
        <div className="animal-component">
            <input
                onChange={handleChange}
                type="text"
                name="name"
                value={animal.name}
            />
            <input
                onChange={handleChange}
                type="text"
                name="species"
                value={animal.species}
            />
            <input
                onChange={handleChange}
                type="text"
                name="breed"
                value={animal.breed}
            />
            <input
                onChange={handleChange}
                type="text"
                name="gender"
                value={animal.gender}
            />
            <input
                onChange={handleChange}
                type="text"
                name="colour"
                value={animal.colour}
            />
            <input
                onChange={handleChange}
                type="date"
                name="dateOfBirth"
                value={animal.dateOfBirth}
            />

            <select 
            value={animal.customer.id}
            onChange={handleSelectCustomer}
            name="customer"
            >
                <option value="">Select customer</option>
                {customers.map((customer) => {
                    return (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    );
                })}
            </select>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
    );
};

export default Animal;
