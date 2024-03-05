import React from 'react'
import './Animal.style.css'
import { useState } from 'react'
import { deleteAnimal, updateAnimal } from '../../api/Animal'

const Animal = ({ animalProp, setAnimals }) => {

    const [animal, setAnimal] = useState(animalProp);

    const handleChange = (event) => {
        setAnimal({ ...animal, [event.target.name]: event.target.value });
    }

    const handleUpdate = () => {
        updateAnimal(animal).then((data) => {
            setAnimal(data);
        });
    }

    const handleDelete = () => {
        deleteAnimal(animal.id).then(() => {
            setAnimals(prev => prev.filter(object => object.id !== animal.id))
        });
    }

  return (
    <div className='animal-component'>
        <input onChange={handleChange} type='text' name='name' value={animal.name}/>
        <input onChange={handleChange} type='text' name='species' value={animal.species}/>
        <input onChange={handleChange} type='text' name='breed' value={animal.breed}/>
        <input onChange={handleChange} type='text' name='gender' value={animal.gender}/>
        <input onChange={handleChange} type='text' name='colour' value={animal.colour}/>
        <input onChange={handleChange} type='date' name='dateOfBirth' value={animal.dateOfBirth}/>

        <button onClick={handleUpdate} className='update-animal-button'>Update</button>
        <button onClick={handleDelete} className='delete-animal-button'>Delete</button>


      
    </div>
  )
}

export default Animal
