import React from 'react'
import Navbar from '../../../components/admin/Navbar'
import Penalties from '../../../components/admin/Penalties'

const AllPenalties = () => {
  return (
    <div>
        <Navbar/>
        <div className="mt-14">
            <Penalties/>
        </div>
    </div>
  )
}

export default AllPenalties