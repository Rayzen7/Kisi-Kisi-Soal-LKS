/* eslint-disable no-unused-vars */
import React from 'react'
import Auth from '../../utils/Auth'
import Navbar from '../../components/Navbar'
import BodyListCar from '../../components/BodyListCar'

const ListCar = () => {
  return (
    <div>
        <Auth>
            <Navbar/>
            <BodyListCar/>
        </Auth>
    </div>
  )
}

export default ListCar