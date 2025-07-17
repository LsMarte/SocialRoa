import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
        404
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        Página no encontrada
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="btn-indigo inline-block"
      >
        Volver al inicio
      </Link>
    </div>
  </div>
);

export default NotFound;