// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(`Navegando a: ${pathname}`); // Log para depuración
    // Desplaza la ventana hacia la parte superior al cambiar la ruta
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;