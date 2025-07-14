import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false); // ✅ controlar tipo de mensaje
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena })
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje('✅ Inicio de sesión exitoso');
      setError(false);
      navigate('/Admin'); 
      // Aquí podrías guardar token o navegar a dashboard
    } else {
      setMensaje(data.error || '❌ Credenciales incorrectas');
      setError(true); // ✅ marcar como error
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl shadow-lg rounded-xl overflow-hidden">
        {/* Left Side (Illustration) */}
        <div className="hidden md:flex w-1/2 bg-[#030056] items-center justify-center p-8">
          <img
            src="/Login.png"
            alt="Login Illustration"
            className="w-[100%]"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 bg-white p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign in</h2>

          {mensaje && (
            <div className={`mb-4 text-sm text-center font-medium px-4 py-2 rounded ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {mensaje}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
