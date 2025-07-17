import { useState } from 'react';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues({
      ...values,
      [name]: newValue,
    });
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return [values, handleInputChange, resetForm];
};

export default useForm;