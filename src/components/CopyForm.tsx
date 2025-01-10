import React from 'react';
import { Formik, Form, Field } from 'formik';

const CopyForm = ({ initialValues, onSubmit }: any) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      enableReinitialize
    >
      {({ values, handleChange }) => (
        <Form className="space-y-6 mb-8">
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
            <label htmlFor="keyId" className="block text-sm font-medium text-700">
              Key ID
            </label>
            <Field
              id="keyId"
              name="keyId"
              type="number"
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
      )}
    </Formik>
  );
};

export default CopyForm;
