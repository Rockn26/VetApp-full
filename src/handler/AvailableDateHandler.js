
import { updateAvailableDate, deleteAvailableDate } from "../api/AvailableDate";
import { createAvailableDate } from "../api/AvailableDate";


 export const handleAdd = (availableDate, setAvailableDate, setAvailableDates) => {
    createAvailableDate(availableDate).then((data) => {
      setAvailableDates(prev => [...prev, data]);
      setAvailableDate({
        availableDate: "",
        doctor: {
          id: 0,
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        },
      });
    });
  }


export const handleUpdate = (availableDate, setAvailableDate) => {
    updateAvailableDate(availableDate).then((data) => {
      setAvailableDate(data);
    });
  };

export const handleDelete = (availableDate, setAvailableDates) => {
    deleteAvailableDate(availableDate.id).then(() => {
      setAvailableDates((prev) => prev.filter((object) => object.id !== availableDate.id));
    });
  };

  