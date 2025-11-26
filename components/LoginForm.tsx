import { CustomButton } from '../components/CustomButton';
import CustomText from "../components/CustomText"
import { TextInput, View, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { loginSchema } from '@/lib/schemas/LoginSchema';

export function LoginForm({ onLoginPress, onRegisterPress, isDisabled = true }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLoginPress = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
      onLoginPress();
    }
  };

  return (
    <>
      <CustomText variant='large'>Inicia sesión!</CustomText>
      <CustomText variant='medium'>Ingresa tus datos para acceder a nuestra app!</CustomText>
          
      {/* Email */}
      <TextInput
        className='bg-white text-black rounded-lg p-3 w-full border border-black'
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      {/* Contraseña */}
      <TextInput
        className='bg-white text-black rounded-lg p-3 w-full border border-black mt-3'
        placeholder='Contraseña'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && (
        <CustomText variant='small' >
          {error}
        </CustomText>
      )}

      <View className='flex-row gap-2 mt-4'>
        <CustomButton 
          variant='primary'
          onPress={handleLoginPress}
        >
          Iniciar sesión
        </CustomButton>
      </View>
    </>
  );
}