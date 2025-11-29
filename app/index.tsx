import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LoginForm } from '@/components/LoginForm';
import { useRouter } from 'expo-router';
import "@/global.css";

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    console.log('Iniciando sesión...');
    router.replace('/(tabs)/dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView 
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className='flex-1 justify-center items-center px-6 bg-black/40'>
          <View className='w-full max-w-md bg-white/90 rounded-2xl p-6 shadow-lg'>
            <LoginForm 
              onLoginPress={handleLogin}
              isDisabled={false}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
