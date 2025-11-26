import React, { useState } from 'react';

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    priority: ''
  });

  // TIPADO DEL EVENTO
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      ...formData,
      completed: false,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) throw new Error("Error al guardar la tarea");

      const data = await response.json();
      console.log("Tarea guardada:", data);

      // Limpiar formulario
      setFormData({
        title: '',
        type: '',
        priority: ''
      });

      alert("Tarea agregada correctamente 👍");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar la tarea");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Nueva Tarea</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Título */}
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Título de la Tarea
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ingresa el título de tu tarea"
                required
              />
            </div>

            {/* Type + Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-base font-semibold text-gray-600 mb-2"
                >
                  Tipo
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
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
                <label
                  htmlFor="priority"
                  className="block text-base font-semibold text-gray-600 mb-2"
                >
                  Prioridad
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  required
                >
                  <option value="">Selecciona prioridad</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>

            {/* Botón */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition shadow-lg"
              >
                Agregar Tarea
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
