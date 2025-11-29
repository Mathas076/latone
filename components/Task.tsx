
import React, { useState } from 'react';
import axios from 'axios';
import CustomText from './CustomText'; 

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

  const handleSubmit = async () => {
    if (!formData.title || !formData.type || !formData.priority) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    try {
      const newTask = {
        title: formData.title,
        type: formData.type,
        priority: formData.priority,
        completed: false,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post('http://localhost:3000/tasks', newTask);
      
      console.log('Tarea guardada exitosamente:', response.data);
      alert('¡Tarea agregada exitosamente!');
      
      setFormData({
        title: '',
        type: '',
        priority: ''
      });
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
      alert('Error al guardar la tarea. Asegúrate de que json-server esté corriendo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="bg-indigo-600 -mx-8 -mt-8 mb-8 p-6 rounded-t-2xl">
            <CustomText variant="large">
              Nueva Tarea
            </CustomText>
          </div>

          <div className="space-y-6">
            {/* Título */}
            <div>
              <label htmlFor="title" className="block mb-2">
                <CustomText variant="large" dark={true}>
                  Título de la Tarea
                </CustomText>
              </label>

              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Ingresa el título de tu tarea"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo */}
              <div>
                <label htmlFor="type" className="block mb-2">
                  <CustomText variant="medium" dark={true}>
                    Tipo
                  </CustomText>
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 transition"
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
                <label htmlFor="priority" className="block mb-2">
                  <CustomText variant="medium" dark={true}>
                    Prioridad
                  </CustomText>
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 transition"
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
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <CustomText variant="medium">
                  Agregar Tarea
                </CustomText>
              </button>
            </div>
          </div>

          {/* Vista previa */}
          {(formData.title || formData.type || formData.priority) && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <div className="mb-2">
                <CustomText variant="small" dark={true}>
                  Vista previa:
                </CustomText>
              </div>

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
