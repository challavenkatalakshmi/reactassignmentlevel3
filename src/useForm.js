import { useState, useEffect } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      // Assume that form submission is successful
      setValues((prevValues) => ({
        ...prevValues,
        submitted: true,
      }));
    } else {
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
  };
};

export default useForm;
