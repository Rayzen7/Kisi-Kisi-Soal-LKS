/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../view/Login'
import Dashboard from '../view/home/Dashboard'
import AddValidator from '../view/home/AddValidator'
import ListCar from '../view/home/ListCar'
import CarDetail from '../view/home/CarDetail'

const Router = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Dashboard/>}/>
                <Route path='/validation/add' element={<AddValidator/>}/>
                <Route path='/listcar' element={<ListCar/>}/>
                <Route path='/car/detail/:id' element={<CarDetail/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router