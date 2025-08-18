import React, { useState } from 'react';
import Login from './components/login';
import Register from './components/Register';
import GetAllUsers from './components/getAllUsers';

const navButtonStyle = {
  background: '#4caf50',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  marginLeft: '10px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.07)',
  transition: 'background 0.2s'
};

const App = () => {
  const [view, setView] = useState(null);

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh' }}>
      <div
        style={{
          background: '#bdbdbd',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '0',
          borderRadius: '6px',
          marginBottom: '40px',
          height: '70px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <h3 style={{ marginRight: 'auto', marginLeft: '30px', fontWeight: 'bold', color: '#333' }}>Ecommers</h3>
        <button style={navButtonStyle} onClick={() => setView('home')}>Home</button>
        <button style={navButtonStyle} onClick={() => setView('login')}>Login</button>
        <button style={navButtonStyle} onClick={() => setView('register')}>Register</button>
        <button style={navButtonStyle} onClick={() => setView('getAllUsers')}>Get All Users</button>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        {view === 'login' && <Login />}
        {view === 'register' && <Register />}
        {view === 'getAllUsers' && <GetAllUsers />}
        {!view && (
          <div style={{ textAlign: 'center', color: '#333', fontSize: '2rem', fontWeight: 'bold' }}>
            Welcome to the Web Login/Register App
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
