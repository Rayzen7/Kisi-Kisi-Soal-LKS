import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Rent from '../../components/admin/Rent'
import { ToastContainer } from 'react-toastify'
import User from '../../components/admin/User'
import Penalties from '../../components/admin/Penalties'
import Return from '../../components/admin/Return'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="mt-14">
            <User/>
            <Rent/>
            <Penalties/>
            <Return/>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Home