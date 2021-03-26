import React, { useState } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import axios from 'axios'
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

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
      console.log(err)
    }
  }
  
  return (

    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Register
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <label>Email</label>
            <Form.Input fluid icon='user' iconPosition='left' name='email' placeholder='Email' onChange={handleChange} value={formData.email} />
            <label>Username</label>
            <Form.Input
              onChange={handleChange}
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              type='username'
              name='username'
              value={formData.username}
            />
            <label>Password</label>
            <Form.Input
              onChange={handleChange}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              value={formData.password}
            />
            <label>Password Confirmation</label>
            <Form.Input
              onChange={handleChange}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password Confirmation'
              type='passwordConfirmation'
              name='passwordConfirmation'
              value={formData.passwordConfirmation}
            />
            <Button color='teal' fluid size='large' type='submit'>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href='#'>Sign In</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Register
