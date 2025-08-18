import React, { useState } from "react";
import '../styles/login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: ''
    });
    const [notification, setNotification] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const token = await res.text();
            if (res.ok && token) {
                setNotification('Login successful!');
                localStorage.setItem('jwtToken', token);
                console.log('JWT Token:', token);
            } else {
                setNotification('Login failed.');
                console.log('Login failed:', token);
            }
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            setNotification('Network error.');
            setTimeout(() => setNotification(''), 3000);
            console.log('Network error:', error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {notification && (
                <div className="login-notification">{notification}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label className="login-label">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="login-input"
                    />
                </div>
                <div className="login-form-group">
                    <label className="login-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="login-input"
                    />
                </div>
                <div className="login-form-group role">
                    <label className="login-label">Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="login-input"
                    />
                </div>
                <button
                    type="submit"
                    className="login-button"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;