import React from 'react'
import Navbar from '../../components/Navbar'
import HomeBody from '../../components/HomeBody'
import Auth from '../../utils/Auth'

const Dashboard = () => {
  return (
    <div>
        <Auth className="">
            <Navbar/>
            <div className="">
                <HomeBody/>
            </div>
        </Auth>
    </div>
  )
}

export default Dashboard