import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from '../view/auth/SignIn'
import SignUp from '../view/auth/SignUp'
import Dashboard from '../view/auth/User/Dashboard'

const Router = () => {
  return (
    <div className="">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>

                {/* User */}
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router