import React, { useState, useEffect } from 'react';
import { TaskContext } from './TaskContext';

const API_URL = 'http://localhost:3001/tasks';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todas las tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Obtener todas las tareas
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nueva tarea
  const addTask = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = {
        ...task,
        completed: false,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      const createdTask = await response.json();
      setTasks(prevTasks => [...prevTasks, createdTask]);
      return createdTask;
    } catch (err) {
      setError(err.message);
      console.error('Error adding task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar tarea completa
  const updateTask = async (id, updatedTask) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }

      const updated = await response.json();
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === id ? updated : task))
      );
      return updated;
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }

      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Alternar estado completado
  const toggleTaskComplete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) {
        throw new Error('Tarea no encontrada');
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !task.completed })
      });

      if (!response.ok) {
        throw new Error('Error al cambiar estado de la tarea');
      }

      const updated = await response.json();
      setTasks(prevTasks =>
        prevTasks.map(t => (t.id === id ? updated : t))
      );
      return updated;
    } catch (err) {
      setError(err.message);
      console.error('Error toggling task:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Métodos de filtrado (no requieren API)
  const getTasksByType = (type) => {
    return tasks.filter(task => task.type === type);
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter(task => task.priority === priority);
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed === true);
  };

  const getPendingTasks = () => {
    return tasks.filter(task => task.completed === false);
  };

  // Valor del contexto
  const contextValue = {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    getTasksByType,
    getTasksByPriority,
    getCompletedTasks,
    getPendingTasks
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;