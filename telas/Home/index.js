import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Menu Principal</Title>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('ListaJogador')}
        style={styles.button}
      >
        Lista de Jogadores
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('ListaPosicao')}
        style={styles.button}
      >
        Lista de Posições
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('CompraJogador')}
        style={styles.button}
      >
        Comprar Jogadores
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('ListaVenda')}
        style={styles.button}
      >
        Lista Venda
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    marginBottom: 20,
  },
});
