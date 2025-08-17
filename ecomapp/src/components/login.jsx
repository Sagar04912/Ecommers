import { useState } from "react";

const Login = () => {
        const [formData, setFormData] = useState({
            username: '',
            password: '',
            role: ''
        });
    
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
                const data = await res.json();
                if (res.ok) {
                    // Handle successful login (e.g., save token, redirect)
                    console.log('Login successful:', data);
                } else {
                    // Handle login error
                    console.log('Login failed:', data.message || 'Error');
                }
            } catch (error) {
                console.log('Network error:', error);
            }
        };

        return (
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" // Add this
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" // Add this
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input 
                        type="text" 
                        name="role" // Add this
                        value={formData.role} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                </form>        
            </div>    
        );
};

export default Login;