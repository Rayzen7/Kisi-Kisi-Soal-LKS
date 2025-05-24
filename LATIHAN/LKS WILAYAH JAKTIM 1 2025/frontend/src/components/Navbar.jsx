import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../utils/API'
import cookie from 'js-cookie'
import { toast } from 'react-toastify'

const Navbar = () => {
    const navigate = useNavigate();
    const token = cookie.get('token');

    const handleLogout = async() => {
        try {
            const response = await API.post('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            cookie.remove('token');
            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        }
    }

  return (
    <div>
        <div className="">
            <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#e3f2fd'}}>
              <div className="container">
                <Link to='/home' style={{textDecoration: 'none'}}>
                    <p className="navbar-brand pt-3"><i className="fa-solid fa-notes-medical fa-lg"></i> E-HealthApps</p>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 pt-3">
                    <li className="nav-item">
                      <Link to='/home' style={{textDecoration: 'none'}}>
                        <p className="nav-link active" aria-current="page"><i className="fa-solid fa-xs fa-house"></i> Home</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/schedule' style={{textDecoration: 'none'}}>
                        <p className="nav-link"><i className="fa-solid fa-xs fa-calendar-days"></i> Schedules</p>
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-xs fa-rectangle-list"></i> Master
                      </a>
                      <ul className="dropdown-menu">
                        <Link to='/doctor' style={{textDecoration: 'none'}}>
                            <li><p className="dropdown-item"><i className="fa-solid fa-xs fa-user-doctor"></i> Doctors</p></li>
                        </Link>
                        <Link to='/poliklinik' style={{textDecoration: 'none'}}>
                            <li><p className="dropdown-item"><i className="fa-solid fa-xs fa-building"></i> Poliklinik</p></li>
                        </Link>
                      </ul>
                    </li>
                  </ul>
                  <span className="navbar-text" style={{cursor: 'pointer'}} onClick={handleLogout}>
                    <p className="nav-link active pt-3" aria-current="page"><i className="fa-solid fa-xs fa-sign-out"></i> Logout</p>
                  </span>
                </div>
              </div>
            </nav>
        </div>
    </div>
  )
}

export default Navbar