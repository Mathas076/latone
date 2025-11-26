import { useContext } from 'react';
import { TaskContext } from '@/lib/contexts/tasks/TaskContext';

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  // Verificar que el hook se esté usando dentro del Provider
  if (!context) {
    throw new Error(
      'useTaskContext debe ser usado dentro de un TaskProvider'
    );
  }

  return context;
};

export default useTaskContext;