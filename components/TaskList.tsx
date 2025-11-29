// components/TaskList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import TaskItem from "./TaskItem";
import { TypeTask } from "./types";

// IMPORTANTE: Cambia esta URL según tu configuración
// - Para Android Emulator: usa "10.0.2.2:3000"
// - Para iOS Simulator: usa "localhost:3000"
// - Para dispositivo físico: usa la IP de tu computadora (ej: "192.168.1.100:3000")
const API_URL = "http://10.0.2.2:3000/tasks"; // Android Emulator
//const API_URL = "http://localhost:3000/tasks"; // iOS Simulator
// const API_URL = "http://TU_IP_LOCAL:3000/tasks"; // Dispositivo físico

interface TaskListProps {
  refreshTrigger?: number;
}

export default function TaskList({ refreshTrigger }: TaskListProps) {
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<TypeTask[]>(API_URL);
      
      console.log('Tareas cargadas:', response.data);
      setTasks(response.data);
    } catch (err: any) {
      console.error('Error cargando tareas:', err.message);
      setError('No se pudieron cargar las tareas. Verifica que json-server esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]); // Se ejecuta cuando cambia refreshTrigger

  // Estado de carga
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center py-10">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="text-gray-600 mt-4">Cargando tareas...</Text>
      </View>
    );
  }

  // Estado de error
  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4 py-10">
        <Text className="text-red-600 text-center text-base mb-4">
          {error}
        </Text>
        <TouchableOpacity 
          onPress={fetchTasks}
          className="bg-indigo-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Reintentar</Text>
        </TouchableOpacity>
        
        {/* Ayuda para configurar la conexión */}
        <View className="mt-6 bg-yellow-50 p-4 rounded-lg">
          <Text className="text-yellow-800 font-semibold mb-2">
            💡 Consejos de conexión:
          </Text>
          <Text className="text-yellow-700 text-sm">
            • Android Emulator: usa 10.0.2.2:3000{'\n'}
            • iOS Simulator: usa localhost:3000{'\n'}
            • Dispositivo físico: usa la IP de tu PC
          </Text>
        </View>
      </View>
    );
  }

  // Lista vacía
  if (tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-10">
        <Text className="text-gray-500 text-center text-lg">
          📝 No hay tareas aún
        </Text>
        <Text className="text-gray-400 text-center mt-2">
          Agrega tu primera tarea
        </Text>
      </View>
    );
  }

  // Lista con tareas
  return (
    <ScrollView className="flex-1">
      {/* Contador de tareas */}
      <View className="px-4 pb-2">
        <Text className="text-gray-600 text-sm">
          Total: {tasks.length} tarea{tasks.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Listado de tareas */}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {/* Botón para recargar */}
      <View className="px-4 py-4">
        <TouchableOpacity 
          onPress={fetchTasks}
          className="bg-gray-100 p-3 rounded-lg items-center"
        >
          <Text className="text-gray-600 font-semibold">🔄 Actualizar tareas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}