import React from 'react'
import Navbar from '../../components/user/Navbar'
import Rent from '../../components/user/Rent'
import Penalties from '../../components/user/Penalties'
import Return from '../../components/user/Return'

const HomeUser = () => {
  return (
    <div>
      <Navbar/>
        <div className="mt-14">
          <Rent/>
          <Penalties/>
          <Return/>
        </div>
    </div>
  )
}

export default HomeUser