import React from 'react'
import Navbar from '../../../components/admin/Navbar'
import Rent from '../../../components/admin/Rent'

const AllRent = () => {
  return (
    <div>
        <Navbar/>
        <div className="mt-14">
            <Rent/>
        </div>
    </div>
  )
}

export default AllRent