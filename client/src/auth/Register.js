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
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    // console.log(formData)
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
    <div className='background-register'>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
        <Grid.Column style={{ maxWidth: 450 }} >
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Header as='h2' color='black' textAlign='left' className='ui header register'>
            Register
              </Header>
              <Form.Input fluid icon='user' iconPosition='left' name='email' placeholder='Email' onChange={handleChange} value={formData.email} className={errors}/>
              <Form.Input
                onChange={handleChange}
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
                type='username'
                name='username'
                value={formData.username}
                className={errors}

              />
              <Form.Input
                onChange={handleChange}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                value={formData.password}
                className={errors}
                
              />
              <Form.Input
                onChange={handleChange}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password Confirmation'
                type='passwordConfirmation'
                name='passwordConfirmation'
                value={formData.passwordConfirmation}
                className={errors}
              />
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
