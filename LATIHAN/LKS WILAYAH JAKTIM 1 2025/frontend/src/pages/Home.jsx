import React from 'react'
import Navbar from '../components/Navbar'
import Auth from '../utils/Auth'

const Home = () => {
  return (
    <Auth>
      <Navbar/>
      <div className="">
        <div className="container my-4">
          <figure className="text-center">
            <blockquote className="blockquote">
              <p>E-Health Doctor Scheduling System</p>
            </blockquote>
            <figcaption className="blockquote-footer">
              Welcome <cite title="Source Title">Administrator</cite>
            </figcaption>
          </figure>
        </div>
      </div>
    </Auth>
  )
}

export default Home