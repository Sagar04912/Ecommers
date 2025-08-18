import React from 'react';
import { Link } from 'react-router-dom';
import Login from './login';
import '../styles/Home.css';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7' }}>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        background: '#bdbdbd',
        padding: '0 20px',
        height: '80px',
        borderBottom: '2px solid #aaa',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        zIndex: 1000
      }}>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/register" className="navbar-link">Register</Link>
        <Link to="/getAllUsers" className="navbar-link">Get All Users</Link>
      </nav>
      <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '400px' }}>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Home;