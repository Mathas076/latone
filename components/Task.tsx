import React, { useState } from 'react';

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    priority: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tarea a guardar:', formData);
    // Aquí conectarás con tu API de json-server
    // Por ahora solo mostramos en consola
    
    // Limpiar formulario después de enviar
    setFormData({
      title: '',
      type: '',
      priority: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Nueva Tarea</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título de la tarea */}
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
                Título de la Tarea
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Ingresa el título de tu tarea"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo */}
              <div>
                <label htmlFor="type" className="block text-base font-semibold text-gray-600 mb-2">
                  Tipo
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                  required
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="personal">Personal</option>
                  <option value="trabajo">Trabajo</option>
                  <option value="estudio">Estudio</option>
                  <option value="hogar">Hogar</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Prioridad */}
              <div>
                <label htmlFor="priority" className="block text-base font-semibold text-gray-600 mb-2">
                  Prioridad
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                  required
                >
                  <option value="">Selecciona prioridad</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Agregar Tarea
              </button>
            </div>
          </form>

          {/* Vista previa */}
          {(formData.title || formData.type || formData.priority) && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Vista previa:</h3>
              <p className="text-gray-700">
                <span className="font-semibold">Título:</span> {formData.title || '---'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Tipo:</span> {formData.type || '---'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Prioridad:</span> {formData.priority || '---'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}