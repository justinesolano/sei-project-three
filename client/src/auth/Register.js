import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    // console.log(formData)
  }
  const handleSubmit = async event => {
    try {
      event.preventDefault()
      const response = await axios.post('/api/Register', formData)
      console.log('Jetflix and chill?', response)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Username</label>
        <input
          placeholder='Username'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Password Confirmation</label>
        <input
          placeholder='Password Confirmation'
          name='passwordConfirmation'
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default Register
