
import React from 'react'
import { Routes, Route  } from 'react-router-dom'
import AnimalPage from './pages/AnimalPage/AnimalPage'
import AppointmentPage from './pages/AppointmentPage/AppointmentPage'
import CustomerPage from './pages/CustomerPage/CustomerPage'
import DoctorPage from './pages/DoctorPage/DoctorPage'
import ReportPage from './pages/ReportPage/ReportPage'
import VaccinePage from './pages/VaccinePage/VaccinePage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/animal" element={<AnimalPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path='/doctor' element={<DoctorPage />} />
        <Route path='/report' element={<ReportPage />} />
        <Route path='/vaccine' element={<VaccinePage />} />
      </Routes>
    </div>
  )
}

export default App
