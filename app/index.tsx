import { View, ImageBackground } from 'react-native';
import { LoginForm } from '@/components/LoginForm';
import { useRouter } from 'expo-router';
import "@/global.css";

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, validar credenciales con un backend
    console.log('Iniciando sesión...');
    
    // Navegar a la pantalla principal después del login
    //router.replace('/(tabs)');
  };

  return (
      <View className='flex-1 justify-center items-center px-6 bg-black/40'>
        <View className='w-full max-w-md bg-white/90 rounded-2xl p-6 shadow-lg'>
          <LoginForm 
            onLoginPress={handleLogin}
            isDisabled={false}
          />
        </View>
      </View>
  );
}