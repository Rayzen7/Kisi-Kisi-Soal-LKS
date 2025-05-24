import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../view/Login'
import Dashboard from '../view/home/Dashboard'
import AddValidator from '../view/home/AddValidator'

const Router = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/home' element={<Dashboard/>}/>
                <Route path='/validation/add' element={<AddValidator/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router