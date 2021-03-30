import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { Button, Header } from 'semantic-ui-react'


const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState('')

  const history = useHistory()

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', formData)
      window.localStorage.setItem('token', response.data.token)
      history.push('/home')
    } catch (err) {
      setErrors('input is-danger')
      console.log(err)
    }
  }

  return (
    <section className="login-page section">
      <div className="container">
        <div className="columns">
          <form className="login-content box column is-half is-offset-one-quarter" onSubmit={handleSubmit}>
            <Header className="header" as="h2" textAlign="left" >
              Log In
            </Header>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className={`input ${errors}`}
                  type="email" 
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className={`input ${errors}`}
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <Button color="red" fluid size="large" type="submit">
              Login
            </Button>
            <div className='account-signin-link'> 
              New to us? <a href="/register">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login