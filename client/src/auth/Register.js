import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  console.log(formData, setFormData)
  const handleChange = event => { 
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    console.log(formData)
  }

  return (
    <Form>
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
          name='password-confirmation'
          value={formData.passwordConfirmation} 
          onChange={handleChange}
        />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default Register
