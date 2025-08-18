import React, { useEffect, useState } from 'react';
import '../styles/GetAllUsers.css';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/getAllUsers')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8080/api/v1/deleteUser/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.filter(user => user.id !== id));
      setNotification('User deleted successfully.');
      setTimeout(() => setNotification(''), 3000); // Clear after 3 seconds
    } else {
      setNotification('Failed to delete user.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>All Users</h2>
      {notification && <div style={{ color: 'green', marginBottom: '10px' }}>{notification}</div>}
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllUsers;