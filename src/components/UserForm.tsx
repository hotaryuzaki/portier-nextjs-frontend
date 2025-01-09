import React from 'react'
import { Field, Form, Formik } from 'formik'
import { User } from '../types/models'
import axiosInstance from '../utils/axiosInstance'

const UserForm: React.FC = () => {
  const initialValues: User = { id: 0, name: '', email: '', status: '' }

  const handleSubmit = async (values: User) => {
    try {
      const response = await axiosInstance.post('/users', values)
      console.log(response.data)
    } catch (error) {
      console.error('Error submitting form', error)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="space-y-4">
        <div>
          <Field name="name" placeholder="Name" className="input" />
        </div>
        <div>
          <Field name="email" placeholder="Email" type="email" className="input" />
        </div>
        <div>
          <Field name="status" placeholder="Status" className="input" />
        </div>
        <button type="submit" className="btn">Submit</button>
      </Form>
    </Formik>
  )
}

export default UserForm
