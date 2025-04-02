import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';


import Home from './telas/Home';
import CadJogador from './telas/CadJogador';
import CadPosicao from './telas/CadPosicao';
import ListaJogador from './telas/ListaJogador';
import ListaPosicao from './telas/ListaPosicao';
import CompraJogador from './telas/CompraJogador';
import ListaVenda from './telas/ListaVenda';
import GraficoVenda from './telas/GraficoVenda';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false}} />
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


