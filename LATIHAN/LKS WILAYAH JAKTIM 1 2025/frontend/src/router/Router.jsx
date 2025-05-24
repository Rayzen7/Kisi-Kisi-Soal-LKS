import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Doctor from '../pages/Doctor'
import DoctorEdit from '../pages/Edit/DoctorEdit'
import Poliklinik from '../pages/Poliklinik'
import PoliklinikEdit from '../pages/Edit/PoliklinikEdit'
import Schedule from '../pages/Schedule'
import ScheduleEdit from '../pages/Edit/ScheduleEdit'
import Register from '../pages/Register'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>

            <Route path='/doctor' element={<Doctor/>}/>
            <Route path='/doctor/edit/:id' element={<DoctorEdit/>}/>

            <Route path='/poliklinik' element={<Poliklinik/>}/>
            <Route path='/poliklinik/edit/:id' element={<PoliklinikEdit/>}/>

            <Route path='/schedule' element={<Schedule/>}/>
            <Route path='/schedule/edit/:id' element={<ScheduleEdit/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router