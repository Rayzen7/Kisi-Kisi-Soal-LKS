import React from 'react'
import { BrowserRouter, Route, Routes }  from 'react-router-dom'
import Login from '../pages/auth/Login'
import Home from '../pages/admin/Home'
import Register from '../pages/auth/Register'
import EditUser from '../pages/admin/User/EditUser'
import AddRent from '../pages/admin/Rent/AddRent'
import EditRent from '../pages/admin/Rent/EditRent'
import AddPenalties from '../pages/admin/Penalties/AddPenalties'
import EditPenalties from '../pages/admin/Penalties/EditPenalties'
import AddReturn from '../pages/admin/Return/AddReturn'
import EditReturn from '../pages/admin/Return/EditReturn'
import AllRent from '../pages/admin/Rent/AllRent'
import AllReturn from '../pages/admin/Return/AllReturn'
import AllPenalties from '../pages/admin/Penalties/AllPenalties'
import HomeUser from '../pages/user/HomeUser'
import AllUserRent from '../pages/user/AllUserRent'
import AllUserReturn from '../pages/user/AllUserReturn'
import AllUserPenalties from '../pages/user/AllUserPenalties'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>

            {/* Admin */}
            <Route path='/admin/home' element={<Home/>}/>
            <Route path='/admin/user/edit/:id' element={<EditUser/>}/>

            <Route path='/admin/rent/add' element={<AddRent/>}/>
            <Route path='/admin/rent' element={<AllRent/>}/>
            <Route path='/admin/rent/edit/:id' element={<EditRent/>}/>

            <Route path='/admin/penalties/add' element={<AddPenalties/>}/>
            <Route path='/admin/penalties' element={<AllPenalties/>}/>
            <Route path='/admin/penalties/edit/:id' element={<EditPenalties/>}/>

            <Route path='/admin/return/add' element={<AddReturn/>}/>
            <Route path='/admin/return' element={<AllReturn/>}/>
            <Route path='/admin/return/edit/:id' element={<EditReturn/>}/>

            {/* User */}
            <Route path='/user/home' element={<HomeUser/>}/>
            <Route path='/user/rent' element={<AllUserRent/>}/>
            <Route path='/user/return' element={<AllUserReturn/>}/>
            <Route path='/user/penalties' element={<AllUserPenalties/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router