import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Para cookies
        body: JSON.stringify({ email, contrasena })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      // Login exitoso
      navigate('/admin');
      
    } catch (err) {
      console.error('Error:', err);
      setError('Error de red. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl shadow-lg rounded-xl overflow-hidden">
        {/* Imagen izquierda */}
        <div className="hidden md:flex w-1/2 bg-[#030056] items-center justify-center p-8">
          <img src="/Login.png" alt="Login Illustration" className="w-full" />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 bg-white p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign in</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
            >
              {loading ? 'Iniciando sesión...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}