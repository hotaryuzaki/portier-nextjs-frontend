import React from 'react';
import { Formik, Form, Field } from 'formik';

const UserForm = ({ initialValues, onSubmit }: any) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="space-y-6 mb-8">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-700">
            Username
          </label>
          <Field
            id="username"
            name="username"
            type="text"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-700">
            Email
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-700">
            Password
          </label>
          <Field
            id="password"
            name="password"
            type="password"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-700">
            Name
          </label>
          <Field
            id="name"
            name="name"
            type="text"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-700">
            Gender
          </label>
          <Field
            as="select"
            id="gender"
            name="gender"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          >
            <option value="1">Male</option>
            <option value="0">Female</option>
          </Field>
        </div>
        <div>
          <label htmlFor="id_number" className="block text-sm font-medium text-700">
            ID Number
          </label>
          <Field
            id="id_number"
            name="id_number"
            type="text"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="user_image" className="block text-sm font-medium text-700">
            User Image
          </label>
          <Field
            id="user_image"
            name="user_image"
            type="text"
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default UserForm;
