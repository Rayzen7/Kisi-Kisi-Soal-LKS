import React from 'react'
import Navbar from '../../components/user/Navbar'
import Penalties from '../../components/user/Penalties'

const AllUserPenalties = () => {
  return (
    <div>
        <Navbar/>
        <div className="mt-14">
            <Penalties/>
        </div>
    </div>
  )
}

export default AllUserPenalties