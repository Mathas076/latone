import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import "@/global.css";

export default function Index() {
  const router = useRouter();


  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
}
