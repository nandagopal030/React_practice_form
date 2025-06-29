// App.jsx
import { Routes, Route } from 'react-router-dom';
import FormPage from './pages/Formpage';
import CrudPage from './pages/CrudPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/form" element={<FormPage />} />
      <Route path="/formdata" element={<CrudPage />} />
    </Routes>
  );
}

export default App;
