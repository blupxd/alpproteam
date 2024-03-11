import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useNavigate();
  const params = useParams()
  useEffect(() => {
 
    const userToken = localStorage.getItem('user');
    if (userToken) {
      // Ako je ulogovan, redirektuj na /admin-panel
      history('/admin-panel');
    }
  }, [params]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      const { token } = response.data;

      // Čuvanje tokena u local storage
      localStorage.setItem('user', token);

      console.log('Login uspešan!');
      // Redirektuj na /admin-panel
      history('/admin-panel');
    } catch (error) {
      console.error('Greška pri logovanju:', error.message);
      setError('Pogrešno korisničko ime ili lozinka.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-white text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white font-medium mb-2">
              Korisničko ime:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-medium mb-2">
              Lozinka:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          {error && (
            <p className="text-red-500 mb-4 text-sm">{error}</p>
          )}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Prijavi se
          </button>
          </form>
      </div>
    </div>
  );
};

export default Login;
