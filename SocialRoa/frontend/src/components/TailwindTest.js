import React from 'react';

const TailwindTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            🎉 Tailwind CSS Test Suite
          </h1>
          <p className="text-xl text-gray-600">
            Verificando que todas las clases de Tailwind funcionan correctamente
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Card Regular</h3>
            <p className="text-gray-600">Esta es una card con shadow-soft</p>
          </div>
          <div className="card-compact">
            <h3 className="text-lg font-semibold mb-2">Card Compact</h3>
            <p className="text-gray-600">Esta es una card compacta</p>
          </div>
          <div className="card-elevated">
            <h3 className="text-lg font-semibold mb-2">Card Elevated</h3>
            <p className="text-gray-600">Esta es una card con shadow-medium</p>
          </div>
        </div>

        {/* Form Elements */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Elementos de Formulario</h3>
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="tu@email.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-input form-input-error" 
                placeholder="Contraseña"
              />
              <div className="form-error">Este campo es obligatorio</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Botones</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-danger">Danger</button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-outline-primary">Outline Primary</button>
              <button className="btn btn-outline-secondary">Outline Secondary</button>
              <button className="btn btn-ghost">Ghost</button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary">Normal</button>
              <button className="btn btn-primary btn-lg">Large</button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <div className="alert alert-success">
            ✅ ¡Excelente! Todo funciona correctamente
          </div>
          <div className="alert alert-warning">
            ⚠️ Atención: Verifica la configuración
          </div>
          <div className="alert alert-danger">
            ❌ Error: Algo salió mal
          </div>
          <div className="alert alert-info">
            ℹ️ Información: Datos adicionales
          </div>
        </div>

        {/* Badges */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Badges</h3>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-danger">Danger</span>
          </div>
        </div>

        {/* Avatars */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Avatars</h3>
          <div className="flex items-center gap-4">
            <div className="avatar avatar-xs">XS</div>
            <div className="avatar avatar-sm">SM</div>
            <div className="avatar avatar-md">MD</div>
            <div className="avatar avatar-lg">LG</div>
            <div className="avatar avatar-xl">XL</div>
          </div>
        </div>

        {/* Spinners */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Loading Spinners</h3>
          <div className="flex items-center gap-4">
            <div className="spinner spinner-sm"></div>
            <div className="spinner spinner-md"></div>
            <div className="spinner spinner-lg"></div>
          </div>
        </div>

        {/* Gradients */}
        <div className="card">
          <h3 className="text-2xl font-bold mb-6">Gradientes</h3>
          <div className="space-y-4">
            <div className="bg-gradient-primary text-white p-4 rounded-lg">
              Gradiente Primario
            </div>
            <div className="bg-gradient-secondary text-white p-4 rounded-lg">
              Gradiente Secundario
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center bg-gradient-primary text-white p-8 rounded-lg shadow-glow">
          <h2 className="text-3xl font-bold mb-4">
            🚀 ¡Tailwind CSS está funcionando perfectamente!
          </h2>
          <p className="text-xl opacity-90">
            Todas las clases personalizadas han sido configuradas correctamente
          </p>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
