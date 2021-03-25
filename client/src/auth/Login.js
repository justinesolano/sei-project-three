import React, { useState } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'


const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

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
      console.log(err)
      console.log(formData)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log In
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" name="email" placeholder="Email" onChange={handleChange} />
            <Form.Input
              onChange={handleChange}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
            />
            <Button color="teal" fluid size="large" type="submit">
            Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login
