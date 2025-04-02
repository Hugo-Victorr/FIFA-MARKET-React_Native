import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import { Card, Text, Button, Title, FAB } from 'react-native-paper';
import PosicaoService from '../../Database/PosicaoService';

export default function ListaPosicao({ navigation }) {
  const [posicoes, setPosicoes] = useState([]);

  useEffect(() => {
    carregarPosicoes();
  }, []);

  const carregarPosicoes = async () => {
    try {
      const lista = await PosicaoService.getAll();
      setPosicoes(lista);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as posições');
    }
  };

  const handleEditar = (posicao) => {
    navigation.navigate('CadPosicao', { editar: true, posicao });
  };

  const handleApagar = async (id) => {
    try {
      await PosicaoService.deleteById(id);
      Alert.alert('Sucesso', 'Posição deletada com sucesso!', [
        { text: 'OK' }
      ]);
      carregarPosicoes();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar posição.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Lista de Posições</Title>

        <Button mode="outlined" onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          Voltar para Home
        </Button>

        {posicoes.map((posicao) => (
          <Card key={posicao.id} style={styles.card}>
            <Card.Content>
              <Text>Posição: {posicao.nome}</Text>
              <View style={styles.buttonGroup}>
                <Button mode="contained" onPress={() => handleEditar(posicao)} style={styles.button}>Editar</Button>
                <Button mode="outlined" onPress={() => handleApagar(posicao.id)} style={styles.button}>Apagar</Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CadPosicao')}
        label="Nova"
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
