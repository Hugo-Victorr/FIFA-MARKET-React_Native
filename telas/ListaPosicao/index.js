import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View, ImageBackground } from 'react-native';
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
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Title style={styles.title}>LISTA DE POSIÇÕES</Title>

          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Home')} 
            style={styles.backButton}
            labelStyle={styles.buttonText}
          >
            VOLTAR
          </Button>

          {posicoes.map((posicao) => (
            <Card key={posicao.id} style={styles.card}>
              <Card.Content>
                <Text style={styles.posicaoText}>POSIÇÃO: <Text style={styles.posicaoValue}>{posicao.nome.toUpperCase()}</Text></Text>
                <View style={styles.buttonGroup}>
                  <Button 
                    mode="contained" 
                    onPress={() => handleEditar(posicao)} 
                    style={[styles.button, styles.editButton]}
                    labelStyle={styles.buttonText}
                  >
                    EDITAR
                  </Button>
                  <Button 
                    mode="contained" 
                    onPress={() => handleApagar(posicao.id)} 
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
          onPress={() => navigation.navigate('CadPosicao')}
          label="NOVA POSIÇÃO"
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
  posicaoText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 10,
  },
  posicaoValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
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