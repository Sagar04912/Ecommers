import React, { useState } from 'react';
import Login from './components/login';
import Register from './components/Register';

const App = () => {
  const [view, setView] = useState(null);

  return (
    <div>
      <h1>Welcome to the Web Login/Register App</h1>
      <div>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('register')}>Register</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {view === 'login' && <Login />}
        {view === 'register' && <Register />}
      </div>
    </div>
  );
};

export default App;
