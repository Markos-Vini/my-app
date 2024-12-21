import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import CitiesContextProvider from '@/context/CitiesContext';

export default function PrivateRootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CitiesContextProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="cidades/[cidade]" 
            options={{ 
              title: 'Cidade',
              headerStyle: {
                backgroundColor: '#42A5F5', // Cor azul para a AppBar
              },
              headerTintColor: '#FFF', // Cor do título (branco)
            }} 
          />
          <Stack.Screen 
            name="formCity" 
            options={{ 
              title: 'Formulario de Cidades',
              headerStyle: {
                backgroundColor: '#42A5F5', // Cor azul para a AppBar
              },
              headerTintColor: '#FFF', // Cor do título (branco)
            }} 
          />
          <Stack.Screen 
            name="formCityConfirm" 
            options={{ 
              title: 'Confirmar Dados',
              headerStyle: {
                backgroundColor: '#42A5F5', // Cor azul para a AppBar
              },
              headerTintColor: '#FFF', // Cor do título (branco)
            }} 
          />
          <Stack.Screen 
            name="location" 
            options={{ 
              title: 'Localização',
              headerStyle: {
                backgroundColor: '#42A5F5', // Cor azul para a AppBar
              },
              headerTintColor: '#FFF', // Cor do título (branco)
            }} 
          />
        </Stack>
        
      </CitiesContextProvider>
    </ThemeProvider>
  );
}
