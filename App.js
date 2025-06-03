import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

import Home from './telas/Home';
import CadJogador from './telas/CadJogador';
import CadPosicao from './telas/CadPosicao';
import ListaJogador from './telas/ListaJogador';
import ListaPosicao from './telas/ListaPosicao';
import CompraJogador from './telas/CompraJogador';
import ListaVenda from './telas/ListaVenda';
import GraficoVenda from './telas/GraficoVenda';
import Login from './telas/Auth/Login';
import Cadastro from './telas/Auth/Cadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerBackVisible: false, headerShown: false}} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerBackVisible: true, headerShown: false}} />
          <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false, headerShown: false}} />
          <Stack.Screen name="ListaJogador" component={ListaJogador} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="ListaPosicao" component={ListaPosicao} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="CadJogador" component={CadJogador} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="CadPosicao" component={CadPosicao} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="CompraJogador" component={CompraJogador} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="ListaVenda" component={ListaVenda} options={{ headerBackVisible: true, headerShown: false }} />
          <Stack.Screen name="GraficoVenda" component={GraficoVenda} options={{ headerBackVisible: true, headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer> 
    </PaperProvider>
    );
}


