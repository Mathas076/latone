// components/TaskItem.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { TypeTask } from "./types";

interface Props {
  task: TypeTask;
}

export default function TaskItem({ task }: Props) {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-xl p-4 mx-4 my-2 shadow">
      
      {/* Círculo */}
      <View className="w-7 h-7 rounded-full border-2 border-gray-400 mr-3" />

      {/* Contenido */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">
          {task.title}
        </Text>

        <Text className="text-gray-500 mt-1">
          {task.type} · {task.priority}
        </Text>
      </View>

      {/* Menú (3 puntos) */}
      <TouchableOpacity>
        <Text className="text-2xl text-gray-500">⋮</Text>
      </TouchableOpacity>
    </View>
  );
}
