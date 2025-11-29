// components/Task.tsx
import React, { useState } from 'react';
import { View, TextInput, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import CustomText from './CustomText';

// IMPORTANTE: Cambia esta URL según tu configuración
const API_URL = "http://10.0.2.2:3000/tasks"; // Android Emulator
 //const API_URL = "http://localhost:3000/tasks"; // iOS Simulator
// const API_URL = "http://TU_IP_LOCAL:3000/tasks"; // Dispositivo físico

interface TaskFormProps {
  onTaskAdded?: () => void;
  onCancel?: () => void;
}

export default function TaskForm({ onTaskAdded, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    priority: ''
  });
  const [loading, setLoading] = useState(false);

  const taskTypes = [
    { label: 'Personal', value: 'personal' },
    { label: 'Trabajo', value: 'trabajo' },
    { label: 'Estudio', value: 'estudio' },
    { label: 'Hogar', value: 'hogar' },
    { label: 'Otro', value: 'otro' }
  ];

  const priorities = [
    { label: 'Alta', value: 'alta', color: 'bg-red-500' },
    { label: 'Media', value: 'media', color: 'bg-yellow-500' },
    { label: 'Baja', value: 'baja', color: 'bg-green-500' }
  ];

  const handleSubmit = async () => {
    // Validación
    if (!formData.title.trim() || !formData.type || !formData.priority) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    try {
      setLoading(true);

      const newTask = {
        title: formData.title.trim(),
        type: formData.type,
        priority: formData.priority,
        completed: false,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post(API_URL, newTask);
      
      console.log('✅ Tarea guardada:', response.data);
      
      Alert.alert(
        '¡Éxito!', 
        'Tarea agregada correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpiar formulario
              setFormData({
                title: '',
                type: '',
                priority: ''
              });
              
              // Llamar callback si existe
              if (onTaskAdded) {
                onTaskAdded();
              }
            }
          }
        ]
      );
      
    } catch (error: any) {
      console.error('❌ Error al guardar:', error.message);
      Alert.alert(
        'Error', 
        'No se pudo guardar la tarea. Verifica que json-server esté corriendo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-6">
        {/* Título de la tarea */}
        <View className="mb-6">
          <CustomText variant="large" dark>
            Título de la Tarea
          </CustomText>
          <TextInput
            value={formData.title}
            onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
            placeholder="Ingresa el título de tu tarea"
            className="bg-white text-black rounded-lg p-4 mt-2 border-2 border-gray-300 text-base"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Tipo de tarea */}
        <View className="mb-6">
          <CustomText variant="medium" dark>
            Tipo
          </CustomText>
          <View className="flex-row flex-wrap gap-2 mt-2">
            {taskTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                onPress={() => setFormData(prev => ({ ...prev, type: type.value }))}
                className={`px-4 py-3 rounded-lg border-2 ${
                  formData.type === type.value
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                <Text className={`font-semibold ${
                  formData.type === type.value ? 'text-white' : 'text-gray-700'
                }`}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Prioridad */}
        <View className="mb-6">
          <CustomText variant="medium" dark>
            Prioridad
          </CustomText>
          <View className="flex-row gap-2 mt-2">
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.value}
                onPress={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                className={`flex-1 px-4 py-3 rounded-lg border-2 ${
                  formData.priority === priority.value
                    ? `${priority.color} border-transparent`
                    : 'bg-white border-gray-300'
                }`}
              >
                <Text className={`font-semibold text-center ${
                  formData.priority === priority.value ? 'text-white' : 'text-gray-700'
                }`}>
                  {priority.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vista previa */}
        {(formData.title || formData.type || formData.priority) && (
          <View className="mb-6 p-4 bg-gray-100 rounded-lg border-2 border-gray-200">
            <CustomText variant="small" dark>
              Vista previa:
            </CustomText>
            <Text className="text-gray-700 mt-2">
              <Text className="font-semibold">Título: </Text>
              {formData.title || '---'}
            </Text>
            <Text className="text-gray-700 mt-1">
              <Text className="font-semibold">Tipo: </Text>
              {formData.type ? taskTypes.find(t => t.value === formData.type)?.label : '---'}
            </Text>
            <Text className="text-gray-700 mt-1">
              <Text className="font-semibold">Prioridad: </Text>
              {formData.priority ? priorities.find(p => p.value === formData.priority)?.label : '---'}
            </Text>
          </View>
        )}

        {/* Botones */}
        <View className="flex-row gap-3">
          {onCancel && (
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-gray-300 p-4 rounded-lg items-center"
              disabled={loading}
            >
              <Text className="text-gray-700 font-semibold text-base">
                Cancelar
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleSubmit}
            className={`flex-1 p-4 rounded-lg items-center ${
              loading ? 'bg-indigo-400' : 'bg-indigo-600'
            }`}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-base">
              {loading ? 'Guardando...' : 'Agregar Tarea'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}