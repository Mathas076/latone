import { createContext } from 'react';

// Crear el contexto para las tareas
export const TaskContext = createContext();

// Valores por defecto del contexto (para referencia)
const defaultContextValue = {
  // Estado
  tasks: [],
  loading: false,
  error: null,
  
  // Métodos CRUD
  fetchTasks: async () => {},
  addTask: async (task) => {},
  updateTask: async (id, updatedTask) => {},
  deleteTask: async (id) => {},
  toggleTaskComplete: async (id) => {},
  
  // Métodos de filtrado
  getTasksByType: (type) => [],
  getTasksByPriority: (priority) => [],
  getCompletedTasks: () => [],
  getPendingTasks: () => []
};

export default TaskContext;