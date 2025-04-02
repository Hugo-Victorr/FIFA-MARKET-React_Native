import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import JogadorService from '../../Database/JogadorService';
import PosicaoService from '../../Database/PosicaoService';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CadJogador({ route, navigation }) {
  const editar = route.params?.editar || false;
  const jogadorEdicao = route.params?.jogador;

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [posicao, setPosicao] = useState(null);
  const [ritmo, setRitmo] = useState('');
  const [finalizacao, setFinalizacao] = useState('');
  const [passe, setPasse] = useState('');
  const [conducao, setConducao] = useState('');
  const [defesa, setDefesa] = useState('');
  const [fisico, setFisico] = useState('');
  const [preco, setPreco] = useState(''); 

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      await JogadorService.init();
      await JogadorService.getJogadores(); 
      const posicoes = await PosicaoService.getAll();
      const formatado = posicoes.map(p => ({ label: p.nome, value: p.nome }));
      setItems(formatado);
    };
    carregar();
  }, []);

  useEffect(() => {
    if (editar && jogadorEdicao) {
      setNome(jogadorEdicao.nome);
      setIdade(String(jogadorEdicao.idade)); 
      setPosicao(jogadorEdicao.posicao);
      setRitmo(String(jogadorEdicao.ritmo));
      setFinalizacao(String(jogadorEdicao.finalizacao));
      setPasse(String(jogadorEdicao.passe));
      setConducao(String(jogadorEdicao.conducao));
      setDefesa(String(jogadorEdicao.defesa));
      setFisico(String(jogadorEdicao.fisico));
      setPreco(String(jogadorEdicao.preco));
    }
  }, [editar, jogadorEdicao]);

  const handleSalvar = async () => {
    const jogador = {
      id: jogadorEdicao?.id, 
      nome,
      idade: parseInt(idade),
      posicao,
      ritmo: parseInt(ritmo),
      finalizacao: parseInt(finalizacao),
      passe: parseInt(passe),
      conducao: parseInt(conducao),
      defesa: parseInt(defesa),
      fisico: parseInt(fisico),
      preco: parseFloat(preco)
    };

    try {
      if (editar) {
        await JogadorService.update(jogador);
        Alert.alert('Sucesso', 'Jogador atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('ListaJogador') }
        ]);
      } else {
        await JogadorService.insert(jogador);
        Alert.alert('Sucesso', 'Jogador cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('ListaJogador') }
        ]);
      }
    } catch (error) {
      console.error('Erro ao salvar jogador:', error.message);
      Alert.alert('Erro', 'Erro ao salvar jogador.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>{editar ? 'Editar Jogador' : 'Cadastrar Jogador'}</Title>

      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.backButton}>
          Voltar para Lista de Jogadores
        </Button>

      <TextInput label="Nome" value={nome} onChangeText={setNome} style={styles.input} mode="outlined" />
      <TextInput label="Idade" value={idade} onChangeText={setIdade} style={styles.input} keyboardType="numeric" mode="outlined" />

      <DropDownPicker
        placeholder='Selecione uma posição'
        open={open}
        value={posicao}
        items={items}
        setOpen={setOpen}
        setValue={setPosicao}
        setItems={setItems}
        listMode="SCROLLVIEW"
        style={styles.input}
      />

      <TextInput label="Ritmo" value={ritmo} onChangeText={setRitmo} style={styles.input} keyboardType="numeric" mode="outlined" />
      <TextInput label="Finalização" value={finalizacao} onChangeText={setFinalizacao} style={styles.input} keyboardType="numeric" mode="outlined" />
      <TextInput label="Passe" value={passe} onChangeText={setPasse} style={styles.input} keyboardType="numeric" mode="outlined" />
      <TextInput label="Condução" value={conducao} onChangeText={setConducao} style={styles.input} keyboardType="numeric" mode="outlined" />
      <TextInput label="Defesa" value={defesa} onChangeText={setDefesa} style={styles.input} keyboardType="numeric" mode="outlined" />
      <TextInput label="Físico" value={fisico} onChangeText={setFisico} style={styles.input} keyboardType="numeric" mode="outlined" />
      <TextInput label="Preço" value={preco} onChangeText={setPreco} style={styles.input} keyboardType="numeric" mode="outlined" />

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
    textAlign: 'center'
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
});
