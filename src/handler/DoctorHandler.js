import { deleteDoctor } from "../api/Doctor";
import { updateDoctor } from "../api/Doctor";

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


