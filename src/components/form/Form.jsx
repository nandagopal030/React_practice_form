//css
import './form.css'
//json objects
import formdata from './formElements.json'
//hooks
import { useState,useEffect  } from 'react'

export const Form = ({onAdd}) => {
  
   const [formData, setFormData] =useState({
    name : '',
    age  : '',
    nationality: '', 
    email: '',
    contactnumber: '',
    gender: '',
    address: '',
    remember: '',
   })
   const [errors,setErrors] = useState({
    name : '',
    age  : '',
    nationality: '', 
    email: '',
    contactnumber: '',
    gender: '',
    address: '',
    remember: '',
   })

    //handling the change event in every field of forms
    const handleChange = (e) =>{
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,[name]:value
        }));
        if (name in errors){
            const errMsg = validateField(name, value);
            setErrors((prev) =>({...prev, [name] : errMsg}));
        }
    };

   
    //validating function
    const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = '* Name is required'; 
        if (/\d/.test(value)) error = '* Name must not contain numbers';
        break;
      case 'age':
        if (!value) error = '* Age is required'; 
        if (value <= 0 || value > 120) error = '* Age must be between 1 and 120';
        break;
      case 'email':
        if (!value.trim()) error = '* Email is required'; 
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = '* Invalid email format';
        break;
      case 'contactnumber':
        if (!value) error = '* Contact Number is required'; 
        if (!/^\d{10}$/.test(value)) error = '* Must be 10 digits';
        break;
      case 'gender':
        if (!value) error = '* Please select a gender';
        break;
      case 'address':
        if (!value.trim()) error = '* Address is required';
        break;
      default:
        break;
    }
    return error;
  };

   //handling the submit event in the form and storing it in localStorage
const handleSubmit = (e) => {
  e.preventDefault();

  let allValid = true;
  let newErrors = {};

  for (const field of Object.keys(formData)) {
    const fieldValue = formData[field];
    const fieldError = validateField(field, fieldValue);

    if (fieldError) {
      allValid = false;
      newErrors[field] = fieldError;
    }
  }

  if (!allValid) {
    setErrors(newErrors);
    return;
  }
 
  alert("Form Submitted");
   
  // CREATE USER WITH UNIQUE ID - ADD THIS
  const userWithId = {
    id: Date.now(), // Simple unique ID generation
    ...formData
  };

  // Save to localStorage if all fields are valid
  const existing = JSON.parse(localStorage.getItem('records')) || [];
  const updatedRecords = [...existing, userWithId]; 
  localStorage.setItem('records', JSON.stringify(updatedRecords));
  console.log(updatedRecords);
   

  // Reset form after submit
  setFormData({
    name: '',
    age: '',
    nationality: '', 
    email: '',
    contactnumber: '',
    gender: '',
    address: '',
    remember: '',
  });

  // Clear error state
  setErrors({
    name: '',
    age: '',
    nationality: '', 
    email: '',
    contactnumber: '',
    gender: '',
    address: '',
    remember: '',
  });
    onAdd(userWithId); // PASS userWithId instead of formData
};


return (
   <>
 

  <div className="full-form">
     <div className="form">
    <h2>Dynamic Form validation and crud operation</h2>
  </div>
    <form onSubmit = {handleSubmit}>
    {formdata.map((item, index) => (
      <div key={index}>
        <label htmlFor={item.name}>{item.label}
            {item.required && <span className='required-star'>*</span>}
        </label>
        {item.type === "textarea" ? (
          <textarea
            id={item.name}
            name={item.name}
            value={formData[item.name]}
            placeholder={item.placeholder}
            className={item.name}
            onChange={handleChange}
          />
        ) : item.type === "select" ? (
          <select id={item.name} name={item.name} value={formData[item.name]} className={item.name} onChange={handleChange}>
            {item.options.map((option, i) => (
              <option key={i} value={option.value}> 
            {option.text}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={item.type}
            id={item.name}
            name={item.name}
            value={formData[item.name]}
            placeholder={item.placeholder}
            className={item.name}
            onChange={handleChange}
          />
        )}
        {errors[item.name] && <p className="error-msg">{errors[item.name]}</p>}
      </div>
    ))}
    <div className="btn">
      <button type='submit'>Submit</button>
    </div>
    </form>
  </div>
</>

  )
}