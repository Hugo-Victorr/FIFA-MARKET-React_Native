import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Card, Text, Button, Title, FAB } from 'react-native-paper';
// import JogadorService from '../../Database/JogadorService';
import JogadorApiService from '../../API/JogadorApiService';

export default function ListaJogador({ navigation }) {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    carregarJogadores(); 
  }, []);

  const carregarJogadores = async () => {
    try {
      // const lista = await JogadorService.getJogadores();
      const lista = await JogadorApiService.getAll();
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
      // await JogadorService.deleteJogadorById(id);
      await JogadorApiService.deleteById(id);
      Alert.alert('Sucesso', 'Jogador deletado com sucesso!', [
        { text: 'OK' }
      ]);
      carregarJogadores();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao deletar jogador.');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Title style={styles.title}>LISTA DE JOGADORES</Title>

          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Home')} 
            style={styles.backButton}
            labelStyle={styles.buttonText}
          >
            VOLTAR
          </Button>

          {jogadores.map((jogador) => (
            <Card key={jogador._id} style={styles.card}>
              <Card.Content>
                <Text style={styles.cardTextTitle}>{jogador.nome.toUpperCase()}</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statRow}>
                    <Text style={styles.cardText}>Idade: <Text style={styles.statValue}>{jogador.idade}</Text></Text>
                    <Text style={styles.cardText}>Posição: <Text style={styles.statValue}>{jogador.posicao}</Text></Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.cardText}>Ritmo: <Text style={styles.statValue}>{jogador.ritmo}</Text></Text>
                    <Text style={styles.cardText}>Finalização: <Text style={styles.statValue}>{jogador.finalizacao}</Text></Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.cardText}>Passe: <Text style={styles.statValue}>{jogador.passe}</Text></Text>
                    <Text style={styles.cardText}>Condução: <Text style={styles.statValue}>{jogador.conducao}</Text></Text>
                  </View>
                  <View style={styles.statRow}>
                    <Text style={styles.cardText}>Defesa: <Text style={styles.statValue}>{jogador.defesa}</Text></Text>
                    <Text style={styles.cardText}>Físico: <Text style={styles.statValue}>{jogador.fisico}</Text></Text>
                  </View>
                  <Text style={[styles.cardText, styles.priceText]}>PREÇO: <Text style={styles.priceValue}>R$ {jogador.preco.toFixed(2)}</Text></Text>
                </View>

                <View style={styles.buttonGroup}>
                  <Button 
                    mode="contained" 
                    onPress={() => handleEditar(jogador)} 
                    style={[styles.button, styles.editButton]}
                    labelStyle={styles.buttonText}
                  >
                    EDITAR
                  </Button>
                  <Button 
                    mode="contained" 
                    onPress={() => handleApagar(jogador._id)} 
                    style={[styles.button, styles.deleteButton]}
                    labelStyle={styles.buttonText}
                  >
                    APAGAR
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('CadJogador')}
          label="NOVO JOGADOR"
          color="#FFFFFF"
          theme={{ colors: { accent: '#0096FF' } }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: 'rgba(10, 31, 58, 0.85)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 150, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'rgba(20, 50, 90, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
    elevation: 5,
    shadowColor: '#0096FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginVertical: 2,
    flex: 1,
  },
  statValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  priceText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  priceValue: {
    color: '#00FF87',
    fontWeight: 'bold',
  },
  statsContainer: {
    marginVertical: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 4,
    height: 40,
  },
  editButton: {
    backgroundColor: '#0096FF',
    borderColor: '#00B4FF',
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3A30',
    borderColor: '#FF5E57',
    borderWidth: 1,
  },
  backButton: {
    backgroundColor: '#0096FF',
    borderColor: '#00B4FF',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#0096FF',
    borderColor: '#00B4FF', 
    borderWidth: 1,
  },
});