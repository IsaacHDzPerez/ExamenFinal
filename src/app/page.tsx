'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Lista de visitantes registrados
const usuarios = [
  { usuario: 'alejandra.m', password: 'verde123', nombre: 'Alejandra Morales', boleto: '00123' },
  { usuario: 'david.p', password: 'bosque456', nombre: 'David Pérez', boleto: '00124' },
  { usuario: 'lucia.r', password: 'eco789', nombre: 'Lucía Ramírez', boleto: '00125' },
];

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (usuarioEncontrado) {
      // Guardamos nombre y boleto en sessionStorage
      sessionStorage.setItem('nombre', usuarioEncontrado.nombre);
      sessionStorage.setItem('boleto', usuarioEncontrado.boleto);
      router.push('/bienvenida');
    } else {
      setError('Datos incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Registro de Visitantes</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="usuario" className="block text-sm mb-1">Usuario</label>
            <input 
              id="usuario"
              type="text" 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none"
              required 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">Contraseña</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none"
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
