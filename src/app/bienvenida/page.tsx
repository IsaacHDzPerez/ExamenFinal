'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BienvenidaPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [boleto, setBoleto] = useState('');

  useEffect(() => {
    const nombreGuardado = sessionStorage.getItem('nombre');
    const boletoGuardado = sessionStorage.getItem('boleto');

    if (!nombreGuardado || !boletoGuardado) {
      router.push('/'); // Si no hay datos, regresa al login
    } else {
      setNombre(nombreGuardado);
      setBoleto(boletoGuardado);
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-100 text-green-800">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {nombre}</h1>
      <p className="text-lg">Tu número de boleto es: {boleto}</p>
      <p className="mt-6">Disfruta tu experiencia en GreenPark</p>
    </div>
  );
}
