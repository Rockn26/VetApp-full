import { deleteDoctor } from "../api/Doctor";
import { updateDoctor } from "../api/Doctor";
import { createDoctor } from "../api/Doctor";

export const handleAdd = (doctor, setDoctor, setDoctors) => {
    createDoctor(doctor).then((data) => {
      setDoctors(prev => [...prev, data]);
      setDoctor({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
      });
    });
  }

export const handleUpdate = (doctor, setDoctor) => {
    updateDoctor(doctor).then((data) => {
      setDoctor(data);
    });
  };

export const handleDelete = (doctor, setDoctors) => {
    deleteDoctor(doctor.id).then(() => {
      setDoctors((prev) => prev.filter((object) => object.id !== doctor.id));
    });
  };


