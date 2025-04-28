'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Usuarios hardcodeados
const users = [
  { usuario: 'alejandra.m', password: 'verde123', name: 'Juan Perez', ticket: 'A123' },
  { usuario: 'usuario2', password: 'Password456!', name: 'Ana Lopez', ticket: 'B456' },
  // Puedes agregar más usuarios aquí
];

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const foundUser = users.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (foundUser) {
      // Guardar datos en sessionStorage
      sessionStorage.setItem('name', foundUser.name);
      sessionStorage.setItem('ticket', foundUser.ticket);
      router.push('/bienvenida');
    } else {
      setError('Error: Datos incorrectos');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar sesión</h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <div>
          <label htmlFor="usuario" className="block text-sm mb-1">
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-2 bg-gray-600 rounded-md text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Contraseña
          </label>
          <input
            id="password"
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
  );
}
