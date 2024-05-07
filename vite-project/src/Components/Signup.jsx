import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password.length < 6) {
                setSignupError("Password should be more than 5 characters");
                return;
            }
            const response = await axios.post(`https://qirky-quotes-2.onrender.com/signup`, { username, password }); 
            if (response.status === 201) {
                sessionStorage.setItem('login', true);
                sessionStorage.setItem('signupSuccess', 'Signup successful');
                console.log(response.data); 
                setSignupSuccess(true); 
            } else {
                setSignupError('Signup failed');
            }
        } catch (err) {
            console.error(err);
            setSignupError('An error occurred during the signup');
        }
    }

    if (signupSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="login-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className='text'>Username:</label>
                    <input
                        type="text"
                        id="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className='text'>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {signupError && <p className="error-message">{signupError}</p>}
                <button className="loginbtn" type="submit">Sign Up</button>
            </form>
            <p className="text">Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}

export default Signup;