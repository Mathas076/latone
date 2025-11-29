import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import "@/global.css";
import TaskList from '@/components/TaskList';
import { useState } from 'react';
import TaskForm from '@/components/Task'; // Importa desde Task.tsx

export default function Dashboard() {
  const router = useRouter();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    setShowTaskForm(false);
    // Incrementar el key para forzar refresh de la lista
    setRefreshKey(prev => prev + 1);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-indigo-600 p-6 pb-8">
        <Text className="text-white text-2xl font-bold">Dashboard</Text>
        <Text className="text-white/80 text-sm mt-1">Gestiona tus tareas</Text>
      </View>

      {/* Botón para agregar tarea */}
      <View className="px-4 pt-4 pb-2">
        <TouchableOpacity 
          onPress={() => setShowTaskForm(true)}
          className="bg-indigo-600 p-4 rounded-xl flex-row justify-between items-center shadow"
        >
          <Text className="text-white font-semibold text-base">
             Agregar Nueva Tarea
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tareas */}
      <View className="flex-1 pt-2">
        <View className="px-4 pb-2">
          <Text className="text-gray-700 font-bold text-lg">Mis Tareas</Text>
        </View>
        <TaskList refreshTrigger={refreshKey} />
      </View>

      {/* Modal para agregar tarea */}
      <Modal
        visible={showTaskForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowTaskForm(false)}
      >
        <View className="flex-1 bg-gray-50">
          {/* Header del modal */}
          <View className="bg-indigo-600 p-6 pb-8">
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-2xl font-bold">Nueva Tarea</Text>
              <TouchableOpacity onPress={() => setShowTaskForm(false)}>
                <Text className="text-white text-2xl">✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Formulario */}
          <TaskForm onTaskAdded={handleTaskAdded} onCancel={() => setShowTaskForm(false)} />
        </View>
      </Modal>
    </View>
  );
}