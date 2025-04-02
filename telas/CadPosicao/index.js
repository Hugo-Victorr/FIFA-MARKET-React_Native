import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import PosicaoService from '../../Database/PosicaoService';

export default function CadPosicao({ route, navigation }) {
  const editar = route.params?.editar || false;
    //const editar = true;
  const posicaoEdicao = route.params?.posicao;

  const [nome, setNome] = useState('');

  useEffect(() => {
    const carregar = async () => {
      await PosicaoService.init();
      await PosicaoService.getAll(); 
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
      id: posicaoEdicao?.id,
      nome,
    };

    try {
      if (editar) {
        await PosicaoService.update(posicao);
        Alert.alert('Sucesso', 'Posição atualizada com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('ListaPosicao') }
        ]);
      } else {
        await PosicaoService.insert(posicao.nome);
        Alert.alert('Sucesso', 'Posição cadastrada com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('ListaPosicao') }
        ]);
      }
    } catch (error) {
      console.error('Erro ao salvar Posição:', error.message);
      Alert.alert('Erro', 'Erro ao salvar Posição.');
    }
  };

  // const handleDeletar = async () => {
  //   const posicao = {
  //     id: posicaoEdicao?.id,
  //     nome,
  //   };

  //   try {
  //       await PosicaoService.deleteById(1);
  //       Alert.alert('Sucesso', 'Posição deletada com sucesso!', [
  //         { text: 'OK', onPress: () => navigation.navigate('ListaPosicao') }
  //       ]);
      
  //     PosicaoService.getAll();
  //   //   navigation.goBack();
  //   } catch (error) {
  //     Alert.alert('Erro', 'Erro ao salvar posição.');
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{editar ? 'Editar Posição' : 'Cadastrar Posição'}</Title>

      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.backButton}>
        Voltar para Lista de Posições
      </Button>

      <TextInput
        label="Nome da Posição"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSalvar} style={styles.button}>
        {editar ? 'Atualizar' : 'Cadastrar'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
});
