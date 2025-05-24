import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../../utils/API';

const SignIn = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await API.post('/auth/signin', {
                username: name,
                password
            });

            const token = response.data.token;
            const userName = response.data.user.username;
            const userNameRegex = userName.replace(/\d+/, '', userName);

            localStorage.setItem('token', token);
            alert(response.data.status);
            if (userNameRegex === 'player' || userNameRegex === 'dev') {
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else if (userNameRegex === 'admin') {
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 2000);
            }
        } catch (error) {
            alert('SignIn Failed, Error: ' + error.response.data.message);
        }
    }
  return (
    <div>
        <section className="login">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-5 col-md-6">
                  <h1 className="text-center mb-4">Gaming Portal</h1>
                  <div className="card card-default">
                     <div className="card-body">
                        <h3 className="mb-3">Sign In</h3>
                        
                        <form> 
                           <div className="form-group my-3">
                              <label htmlFor='username' className="mb-1 text-muted">Username</label>
                              <input type="text" id="username" value={name} onChange={(e) => setName(e.target.value)} name="username" className="form-control" autoFocus />
                           </div> 

                           <div className="form-group my-3">
                              <label htmlFor="password" className="mb-1 text-muted">Password</label>
                              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="form-control" />
                           </div>
                           
                           <div className="mt-4 row">
                              <div className="col">
                                 <button onClick={handleLogin} type="submit" className="btn btn-primary w-100">Sign In</button>
                              </div>
                              <div className="col">
                                 <Link to='/signup'>
                                    <p class="btn btn-danger w-100">Sign up</p>
                                 </Link>
                              </div>
                              
                           </div>
                        </form>

                     </div>
                  </div> 
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}

export default SignIn