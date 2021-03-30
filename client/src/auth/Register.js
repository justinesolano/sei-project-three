import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import axios from 'axios'
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, setErrors] = useState('')

  const history = useHistory()

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }
  const handleSubmit = async event => {
    try {
      event.preventDefault()
      await axios.post('/api/Register', formData)
      const response = await axios.post('/api/login', { email: formData.email, password: formData.password })
      window.localStorage.setItem('token', response.data.token)
      history.push('/home')
    } catch (err) {
      setErrors('input is-danger')
      console.log(err)
    }
  }

  return (
    <section className='register-page'>
      <div className="container">
        <div className="columns">
          <form className="register-content box column is-half is-offset-one-quarter" onSubmit={handleSubmit}>
            <Header as='h2' color='black' textAlign='left' className='ui header register'>
            Register
            </Header>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className={`input ${errors}`}
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  onChange={handleChange}
                  value={formData.email}
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
              <p className="control has-icons-left has-icons-right">
                <input 
                  className={`input ${errors}`}
                  type="text" 
                  name="username"
                  placeholder="Username" 
                  onChange={handleChange}
                  value={formData.username}
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
                  placeholder="Password" 
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className={`input ${errors}`}
                  type="password" 
                  placeholder="Password Confirmation" 
                  name='passwordConfirmation'
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <Button color='red' fluid size='large' type='submit'>
                Register
            </Button> 
            <div className='account-signin-link'> 
            Already have an account? <a href='/login'>Sign In</a>
            </div>         
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register
