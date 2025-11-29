import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import "@/global.css" 

export default function Dashboard() {
  const router = useRouter();

  const goToCompletedTasks = () => {
    router.push('/CompletedTask'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Estoy en el Dashboard</Text>
      
      {/* Botón para navegar al 'Index' o 'Home' */}
      <Button 
        title="Ir a Tareas completas"
        onPress={goToCompletedTasks}
        color="#3498db"
      />
    </View>
  );
}