import React from 'react'
import Auth from '../../utils/Auth'
import Navbar from '../../components/Navbar'
import BodyAddValidator from '../../components/BodyAddValidator'

const AddValidator = () => {
  return (
    <div>
        <Auth>
            <Navbar/>
            <BodyAddValidator/>
        </Auth>
    </div>
  )
}

export default AddValidator