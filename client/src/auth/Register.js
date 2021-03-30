import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import axios from 'axios'
import Select from 'react-select'
import { continentOptions, suitableOptions, tagOptions } from '../components/data/searchData'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    myTags: []
  })

  // const [searchdata, setSearchdata] = useState({
  //   search: []
  // })

  const [errors, setErrors] = useState('')

  const history = useHistory()

  const groupedOptions = [
    { label: 'Continents', options: continentOptions },
    { label: 'Suitable For', options: suitableOptions },
    { label: 'Tags', options: tagOptions }
  ]

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleMultiChange = (selected) => {
    const values = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, myTags: [...values] })
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
              <p className="control has-icons-right">
                <input
                  className={`input ${errors}`}
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  onChange={handleChange}
                  value={formData.email}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-right">
                <input 
                  className={`input ${errors}`}
                  type="text" 
                  name="username"
                  placeholder="Username" 
                  onChange={handleChange}
                  value={formData.username}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-right">
                <input 
                  className={`input ${errors}`}
                  type="password" 
                  placeholder="Password" 
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-right">
                <input 
                  className={`input ${errors}`}
                  type="password" 
                  placeholder="Password Confirmation" 
                  name='passwordConfirmation'
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                />
              </p>
            </div>
            <Select className="search-bar-link"
              options={groupedOptions}
              isMulti
              name="search"
              placeholder="Pick your favourite destinations"
              onChange={(selected) => handleMultiChange(selected, 'search')}
            />
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
