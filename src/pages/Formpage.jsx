// pages/FormPage.jsx
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/form/Form';

const FormPage = () => {
  const navigate = useNavigate();

  const handleAddUser = (newUser) => {
    // Navigate to /formdata after form submit
    navigate('/formdata');
  };

  return (
    <div>
      <Form onAdd={handleAddUser} />
    </div>
  );
};

export default FormPage;
