import React, { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  type: string;
  priority: string;
  completed: boolean;
  createdAt: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas", error);
      alert("No se pudieron cargar las tareas 😢");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600 text-xl">
        Cargando tareas...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Lista de Tareas
      </h1>

      {/* No hay tareas */}
      {tasks.length === 0 && (
        <p className="text-gray-600 text-lg">No hay tareas registradas.</p>
      )}

      <div className="grid gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-5"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {task.title}
            </h2>

            <p className="text-gray-700">
              <span className="font-semibold">Tipo:</span> {task.type}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Prioridad:</span>{" "}
              <span
                className={
                  task.priority === "alta"
                    ? "text-red-500"
                    : task.priority === "media"
                    ? "text-yellow-500"
                    : "text-green-600"
                }
              >
                {task.priority}
              </span>
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Estado:</span>{" "}
              {task.completed ? (
                <span className="text-green-600 font-semibold">Completada</span>
              ) : (
                <span className="text-blue-600 font-semibold">
                  Pendiente
                </span>
              )}
            </p>

            <p className="text-gray-600 mt-2 text-sm">
              <span className="font-semibold">Creada:</span>{" "}
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
