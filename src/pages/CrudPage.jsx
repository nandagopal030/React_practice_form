// pages/CrudPage.jsx
import { Crud } from '../components/Crud/Crud';
import { useNavigate } from 'react-router-dom';

const CrudPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/form')} style={{ margin: "10px" }}>
        ← Back to Form
      </button>
      <Crud />
    </div>
  );
};

export default CrudPage;
