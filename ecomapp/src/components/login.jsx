import { useState } from "react";

const Login = () => {
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        });
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            // Handle login logic here
            console.log('Login:', formData);
        };

        return (
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input 
                        type="text" 
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