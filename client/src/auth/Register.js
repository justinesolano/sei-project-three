import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
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
    console.log(event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    console.log(formData)
  }
  const handleSubmit = async event => {
    try {
      event.preventDefault()
      const response = await axios.post('/api/Register', formData)
      window.localStorage.setItem('token', response.data.token)
      console.log(response)
      history.push('/home')
    } catch (err) {
      setErrors('error')
      console.log(err)
    }
  }

  return (
    <div className='register-page'>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' className="register-background">
        <Grid.Column style={{ maxWidth: 450 }} >
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked className="register-content">
              <Header as='h2' color='black' textAlign='left' className='ui header register'>
            Register
              </Header>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className={errors}
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
                    className={errors}
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
                    className={errors}
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
                    className={errors}
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
            </Segment>          
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Register
