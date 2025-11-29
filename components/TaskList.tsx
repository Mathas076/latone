// components/TaskList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView, Text } from "react-native";
import TaskItem from "./TaskItem";
import { TypeTask } from "./types";

export default function TaskList() {
  const [tasks, setTasks] = useState<TypeTask[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await axios<TypeTask[]>({
        method: "get",
        url: "http://localhost:3000/tasks",
      });

      setTasks(res.data);
    } catch (err) {
      console.log("Error cargando tareas", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ScrollView className="w-full">
      {tasks.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10">
          No hay tareas aún
        </Text>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </ScrollView>
  );
}
