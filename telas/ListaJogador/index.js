import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Title, FAB } from 'react-native-paper';
import JogadorService from '../../Database/JogadorService';

export default function ListaJogador({ navigation }) {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    carregarJogadores(); 
  }, []);

  const carregarJogadores = async () => {
    try {
      const lista = await JogadorService.getJogadores();
      setJogadores(lista);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os jogadores');
    }
  };

  const handleEditar = (jogador) => {
    navigation.navigate('CadJogador', { editar: true, jogador }); 
  };

  const handleApagar = async (id) => {
    try {
      await JogadorService.deleteJogadorById(id);
      Alert.alert('Sucesso', 'Jogador deletado com sucesso!', [
        { text: 'OK' }
      ]);
      carregarJogadores();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar jogador.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Lista de Jogadores</Title>

        <Button mode="outlined" onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          Voltar para Home
        </Button>

        {jogadores.map((jogador) => (
          <Card key={jogador.id} style={styles.card}>
            <Card.Content>
              <Text>Nome: {jogador.nome}</Text>
              <Text>Idade: {jogador.idade}</Text>
              <Text>Posição: {jogador.posicao}</Text>
              <Text>Ritmo: {jogador.ritmo}</Text>
              <Text>Finalização: {jogador.finalizacao}</Text>
              <Text>Passe: {jogador.passe}</Text>
              <Text>Condução: {jogador.conducao}</Text>
              <Text>Defesa: {jogador.defesa}</Text>
              <Text>Físico: {jogador.fisico}</Text>
              <Text>Preço: R$ {jogador.preco.toFixed(2)}</Text>

              <View style={styles.buttonGroup}>
                <Button mode="contained" onPress={() => handleEditar(jogador)} style={styles.button}>Editar</Button>
                <Button mode="outlined" onPress={() => handleApagar(jogador.id)} style={styles.button}>Apagar</Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CadJogador')}
        label="Novo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    marginBottom: 15,
    padding: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
