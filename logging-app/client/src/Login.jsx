import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.56.13:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.accessToken); // Stocăm token-ul
      navigate('/logs'); // Redirecționăm către pagina de logs

    } catch (error) {
      console.error('Error during login:', error);
      // Aici poți adăuga logica pentru a afișa mesaje de eroare la interfață
    }
  };


  return (
    <div className=" section flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="form p-5 border rounded-lg ">
        <div className="container mb-3">
          <label htmlFor="username" className="form-label ">Username</label>
          <input type="text" className="form-control border rounded" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="container mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control border rounded" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submt btn btn-primary border rounded">Submit</button>
      </form>
    </div>
  );
}

export default Login;
