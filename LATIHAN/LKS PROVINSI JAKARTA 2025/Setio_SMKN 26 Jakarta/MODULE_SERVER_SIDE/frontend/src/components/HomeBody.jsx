import React from 'react'
import { useEffect, useState } from 'react'
import API from '../utils/API'
import { useNavigate, Link } from 'react-router'
import rupiahFormat from '../utils/RupiahFormat.js'

const HomeBody = () => {
  const token = localStorage.getItem('token');
  const [validation, setValidation] = useState([]);
  const [apply, setApply] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValidation = async () => {
      const response = await API.get('/validation', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setValidation(response.data.validation)
    }

    const fetchApply = async () => {
      const response = await API.get('/applications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setApply(response.data.instalments);
    }

    fetchApply();
    fetchValidation();
  }, [token]);
  return (
    <div>
      <div>
        <header className="jumbotron">
          <div className="container">
            <h1 className="display-4">Dashboard</h1>
          </div>
        </header>

        <div className="container">
          <section className="validation-section mb-5">
            <div className="section-header mb-3">
              <h4 className="section-title text-muted">My Data Validation</h4>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card card-default">
                  <div className="card-header">
                    <h5 className="mb-0">Data Validation</h5>
                  </div>
                  <div className="card-body">
                    <Link to='/validation/add'>
                      <p className="btn btn-primary btn-block">+ Request validation</p>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card card-default">
                  <div className="card-header border-0">
                    <h5 className="mb-0">Data Validation</h5>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped mb-0">
                      <tr>
                        <th>Status</th>
                        <td><span className="badge badge-info">{validation?.status ?? '-'}</span></td>
                      </tr>
                      <tr>
                        <th>Job</th>
                        <td className="text-muted">{validation?.job ?? '-'}</td>
                      </tr>
                      <tr>
                        <th>Income/Month</th>
                        <td className="text-muted">{rupiahFormat(validation?.income ?? '0')}</td>
                      </tr>
                      <tr>
                        <th>Validator</th>
                        <td className="text-muted">{validation?.validator?.name ?? '-'}</td>
                      </tr>
                      <tr>
                        <th>Validator Notes</th>
                        <td className="text-muted">{validation?.validator_notes ?? '-'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="validation-section mb-5">
            <div className="section-header mb-3">
              <div className="row">
                <div className="col-md-8">
                  <h4 className="section-title text-muted">My Installment Cars</h4>
                </div>
                <div className="col-md-4">
                  <a href="" className="btn btn-primary btn-lg btn-block">+ Add Installment Cars</a>
                </div>
              </div>
            </div>
            <div className="section-body">
              {apply.map((data, index) => (
                <div key={index} className="row mb-4">
                  <div className="col-md-12">
                    <div className="alert alert-warning">
                      Your validation must be approved by validator to Installment Cars.
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card card-default">
                      <div className="card-header border-0">
                        <h5 className="mb-0">{data.car ?? '-'}</h5>
                      </div>
                      <div className="card-body p-0">
                        <table className="table table-striped mb-0">
                          <tr>
                            <th>Description</th>
                            <td className="text-muted">{data.description ?? '-'}</td>
                          </tr>
                          <tr>
                            <th>Price</th>
                            <td className="text-muted">{rupiahFormat(data.price ?? '-')}</td>
                          </tr>
                          <tr>
                            <th>Installment</th>
                            <td className="text-muted">
                              {apply[0].application.month + ' Month'} <span className="badge badge-info">{apply[0].application?.apply_status ?? '-'}</span>
                            </td>
                          </tr>
                          <tr>
                            <th>Apply Date</th>
                            <td className="text-muted">Desember 12, 2024</td>
                          </tr>
                          <tr>
                            <th>Notes</th>
                            <td className="text-muted">{apply[0].application.notes ?? '-'}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>              
                </div>
              ))}
            </div>

          </div>
        </div>
      </div >

      <footer>
        <div className="container">
          <div className="text-center py-4 text-muted">
            Copyright &copy; 2024 - Web Tech ID
          </div>
        </div>
      </footer>
    </div >
  )
}

export default HomeBody