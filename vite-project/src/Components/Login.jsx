import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://qirky-quotes-2.onrender.com/login', { username, password });
      
      console.log('Login response:', response);

      if (response.status === 200) { 
        console.log(response)
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('username', username);
        window.location.href = '/'; 
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      setLoginError('Error occurred while logging in. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://qirky-quotes-2.onrender.com/logout');

      if (response.status === 200) {
        console.log('Logout successful');
        setCookie('loggedIn', false, -1); 
        window.location.href = '/login'; 
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label className='text' htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='text' htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <div className="button-container">
          <button type="submit" className='loginbtn'>Login</button>
          <button onClick={handleLogout}className='logoutbtn'>Logout</button>
        </div>
      </form>
      <p> Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;