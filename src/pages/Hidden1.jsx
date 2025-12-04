import React, { useState } from 'react';
import SecretAgentWidget from '../agent/SecretAgentWidget';

const Hidden1 = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const CORRECT_PASSWORD = 'hector1234';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta. Por favor, intenta de nuevo.');
      setPassword('');
    }
  };

  // Si está autenticado, mostrar el chatbot
  if (isAuthenticated) {
    return <SecretAgentWidget />;
  }

  // Mostrar el formulario de autenticación
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border rounded-lg shadow-glow p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Acceso Restringido</h1>
            <p className="text-text-secondary">Ingresa la contraseña para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-card border ${
                  error ? 'border-red-500' : 'border-border'
                } rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors`}
                placeholder="Ingresa la contraseña"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-glow hover:shadow-glow-lg transform hover:scale-[1.02]"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              Esta página está protegida y requiere autenticación
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent-2 opacity-10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Hidden1;
