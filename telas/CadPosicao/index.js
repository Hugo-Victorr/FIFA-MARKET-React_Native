import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, ImageBackground } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
// import PosicaoService from '../../Database/PosicaoService';
import PosicaoApiService from '../../API/PosicaoApiService';

export default function CadPosicao({ route, navigation }) {
  const editar = route.params?.editar || false;
  const posicaoEdicao = route.params?.posicao;

  const [nome, setNome] = useState('');

  const inputTheme = {
    colors: {
      primary: '#0096FF', // cor da borda quando focada
      background: 'rgba(20, 50, 90, 0.7)', // fundo do input
      text: '#FFFFFF', // cor do texto digitado (branco)
      placeholder: '#AAAAAA', // cor do placeholder
      surface: 'rgba(20, 50, 90, 0.7)', // cor de fundo
      accent: '#0096FF', // cor de destaque
      onSurface: '#FFFFFF' // cor do texto
    },
    roundness: 4
  };

  useEffect(() => {
    const carregar = async () => {
      // await PosicaoService.getAll(); 
      await PosicaoApiService.getAll();
    };
    carregar();
  }, []);

  useEffect(() => {
    if (editar && posicaoEdicao) {
      setNome(posicaoEdicao.nome);
    }
  }, [editar, posicaoEdicao]);

  const handleSalvar = async () => {
    const posicao = {
      id: posicaoEdicao?._id,
      nome,
    };

    try {
      if (editar) {
        // await PosicaoService.update(posicao);
        await PosicaoApiService.update(posicao);
        Alert.alert('Sucesso', 'Posição atualizada com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('ListaPosicao') }
        ]);
      } else {
        // await PosicaoService.insert(posicao.nome);
        console.log('Salvando nova posição:', posicao.nome); 
        await PosicaoApiService.insert(posicao.nome);
        Alert.alert('Sucesso', 'Posição cadastrada com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('ListaPosicao') } 
        ]);
      }
    } catch (error) {
      console.error('Erro ao salvar Posição:', error.message);
      Alert.alert('Erro', 'Erro ao salvar Posição.');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>
          {editar ? 'EDITAR POSIÇÃO' : 'CADASTRAR POSIÇÃO'}
        </Title>

        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          labelStyle={styles.buttonText}
        >
          VOLTAR
        </Button>

        <View style={styles.formContainer}>
          <TextInput
            label="NOME DA POSIÇÃO"
            value={nome}
            onChangeText={setNome}
            style={[styles.input, { color: '#FFFFFF' }]} 
            mode="outlined"
            theme={inputTheme}
          />

          <Button 
            mode="contained" 
            onPress={handleSalvar} 
            style={styles.saveButton}
            labelStyle={styles.buttonText}
          >
            {editar ? 'ATUALIZAR' : 'CADASTRAR'}
          </Button>
        </View>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 150, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  formContainer: {
    backgroundColor: 'rgba(20, 50, 90, 0.5)',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
  },
  input: {
    backgroundColor: 'rgba(20, 50, 90, 0.7)',
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#0096FF',
    borderColor: '#00B4FF',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingVertical: 5,
  },
  saveButton: {
    backgroundColor: '#00C853',
    borderColor: '#00E676',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});