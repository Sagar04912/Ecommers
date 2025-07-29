import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',   
        username: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!name) return; // Ignore inputs without a name
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registered:', formData);

        try {
            const response = await fetch('http://localhost:8080/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.text;
            console.log('Server response:', result);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text"
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password"
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input 
                        type="text"
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
