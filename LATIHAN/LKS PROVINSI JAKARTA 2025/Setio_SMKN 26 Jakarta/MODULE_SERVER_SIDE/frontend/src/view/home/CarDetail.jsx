/* eslint-disable no-unused-vars */
import React from 'react'
import Auth from '../../utils/Auth'
import Navbar from '../../components/Navbar'
import BodyCarDetail from '../../components/BodyCarDetail'

const CarDetail = () => {
  return (
    <div>
        <Auth>
            <Navbar/>
            <BodyCarDetail/>
        </Auth>
    </div>
  )
}

export default CarDetail