import React, { useState } from "react";
import '../styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch('http://localhost:8080/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setNotification('User registered successfully!');
                setFormData({ name: '', username: '', password: '', role: '' });
            } else {
                setNotification('Registration failed.');
            }
            setTimeout(() => setNotification(''), 3000); // Clear after 3 seconds
        } catch (error) {
            setNotification('Error registering user.');
            setTimeout(() => setNotification(''), 3000);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            {notification && (
                <div className="register-notification">{notification}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="register-form-group">
                    <label className="register-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                </div>
                <div className="register-form-group role">
                    <label className="register-label">Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="register-input"
                    />
                </div>
                <button
                    type="submit"
                    className="register-button"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
