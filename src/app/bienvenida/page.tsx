'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const usuarios = [
  { email: 'usuario1@greenpark.com', password: 'Password123!', nombre: 'Juan Pérez', boleto: 'A123' },
  { email: 'usuario2@greenpark.com', password: 'Password456!', nombre: 'Ana López', boleto: 'B456' },
  // Agrega más usuarios aquí si quieres
];

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      // Guardamos los datos en sessionStorage para pasarlos a la otra página
      sessionStorage.setItem('nombre', usuarioEncontrado.nombre);
      sessionStorage.setItem('boleto', usuarioEncontrado.boleto);
      router.push('/bienvenida');
    } else {
      setError('Error datos incorrectos');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-white">
      <div className="bg-gray-700 p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Correo electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-600 rounded-md text-white"
              required 
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-600 rounded-md text-white"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
