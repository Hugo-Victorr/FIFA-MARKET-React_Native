import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';


import Home from './telas/Home';
import CadJogador from './telas/CadJogador';
import CadPosicao from './telas/CadPosicao';
import ListaJogador from './telas/ListaJogador';
import ListaPosicao from './telas/ListaPosicao';
import CompraJogador from './telas/CompraJogador';

const Stack = createNativeStackNavigator();

export default function App() {
  return ( 
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CompraJogador">
          <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false}} />
          <Stack.Screen name="CadJogador" component={CadJogador} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="CadPosicao" component={CadPosicao} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="ListaJogador" component={ListaJogador} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="ListaPosicao" component={ListaPosicao} options={{ headerBackVisible: false, headerShown: false }} />
          <Stack.Screen name="CompraJogador" component={CompraJogador} options={{ headerBackVisible: false, headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer> 
    </PaperProvider>
    );
}
