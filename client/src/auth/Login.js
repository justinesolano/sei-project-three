import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'


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
      setErrors('error')
      console.log(err)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked className='ui stacked segment login'>
            <Header as="h2" color="white" textAlign="left" >
              Log In
            </Header>
            <Form.Input
              className={errors}
              fluid icon="user"
              iconPosition="left"
              name="email"
              placeholder="Email"
              onChange={handleChange} />
            <Form.Input
              className={errors}
              onChange={handleChange}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
            />
            <Button color="red" fluid size="large" type="submit">
              Login
            </Button>
            <div className='account-signin-link'> 
              New to us? <a href="/register">Sign Up</a>
            </div>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Login
