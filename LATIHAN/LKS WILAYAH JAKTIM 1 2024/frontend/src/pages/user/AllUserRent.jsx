import React from 'react'
import Navbar from '../../components/user/Navbar'
import Rent from '../../components/user/Rent'

const AllUserRent = () => {
  return (
    <div>
        <Navbar/>
        <div className="mt-14">
            <Rent/>
        </div>
    </div>
  )
}

export default AllUserRent