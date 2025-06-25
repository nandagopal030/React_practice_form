//states
import { useState,useEffect  } from 'react';

//components
import { Form } from '../form/Form';

//styles
import './Crud.css';

//json
import crudElements from './crudElements.json'

export const Crud = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
useEffect(() => {
  const savedUsers = JSON.parse(localStorage.getItem('records')) || [];
  setUsers(savedUsers);
  setFilterUsers(savedUsers);
}, []);
 const handleSearch = (e) =>{
   const searchItem = e.target.value.toLowerCase();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchItem) ||
      user.age.toString().includes(searchItem) ||
      user.email.toLowerCase().includes(searchItem) ||
      user.contactnumber.toString().includes(searchItem) || // FIX: changed contactNumber to contactnumber
      user.gender.toLowerCase().includes(searchItem) ||
      user.address.toLowerCase().includes(searchItem) ||
      (user.nationality && user.nationality.toLowerCase().includes(searchItem)) // ADD nationality search
    );
    setFilterUsers(filtered);
  };
 const handleDelete = (id) => {
  const isConfirmed = window.confirm("Are you sure to Delete?");
  if (isConfirmed) {
    const updated = users.filter(user => user.id !== id);
    setUsers(updated);
    setFilterUsers(updated);

    // FIX: Also update localStorage
    localStorage.setItem('records', JSON.stringify(updated));
  }
};
  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ ...user });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    const updated = users.map(user =>
      user.id === editingId ? { ...editForm } : user // FIX: use { ...editForm } instead of { ...user, ...editForm }
    );
    setUsers(updated);
    setFilterUsers(updated);
    // FIX: Also update localStorage
    localStorage.setItem('records', JSON.stringify(updated));
    
    setEditingId(null);
    setEditForm({}); // FIX: Clear editForm
  };
  return (
    <>
   <Form onAdd={(newUser) => {
        const updated = [...users, newUser]; // FIX: Remove { id: users.length + 1, ...newUser } since Form now provides ID
        setUsers(updated);
        setFilterUsers(updated);
        // FIX: Also update localStorage
        localStorage.setItem('records', JSON.stringify(updated));
      }} />
    <div className="input-search">
        <input
          type="text"
          className="search"
          placeholder="Search Name, Age, City..."
          onChange={handleSearch}
        />
      </div> 
     <table className="table">
    <thead>
  <tr>
    <th>S.NO</th>
    {crudElements.map((col) => (
      <th key={col.key}>{col.label}</th>
    ))}
    <th>Edit</th>
    <th>Delete</th>
  </tr>
</thead>
<tbody>
  {filterUsers.map((user, index) => {
    const isEditing = editingId === user.id;
    return (
      <tr key={user.id}>
        <td>{index + 1}</td>

        {crudElements.map((col) => (
          <td key={col.key}>
            {isEditing ? (
              col.key === 'gender' ? (
                <select
                  name={col.key}
                  value={editForm[col.key] || ''}
                  onChange={handleEditChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              ) : col.key === 'nationality' ? (
                <select
                  name={col.key}
                  value={editForm[col.key] || ''}
                  onChange={handleEditChange}
                >
                  <option value="">Select Nation</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <input
                  name={col.key}
                  value={editForm[col.key] || ''}
                  onChange={handleEditChange}
                />
              )
            ) : (
              user[col.key] || 'N/A'
            )}
          </td>
        ))}

        <td>
          {isEditing ? (
            <button className="btn green" onClick={handleSave}>Save</button>
          ) : (
            <button className="btn green" onClick={() => handleEdit(user)}>Edit</button>
          )}
        </td>
        <td>
          {isEditing ? (
            <button className="btn red" onClick={() => setEditingId(null)}>Cancel</button>
          ) : (
            <button className="btn red" onClick={() => handleDelete(user.id)}>Delete</button>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

     
    </table>
    </>
  );
};