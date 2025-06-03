import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, ImageBackground } from 'react-native';
import { TextInput, Button, Title, useTheme } from 'react-native-paper';
// import JogadorService from '../../Database/JogadorService';
import JogadorApiService from '../../API/JogadorApiService';
// import PosicaoService from '../../Database/PosicaoService';
import PosicaoApiService from '../../API/PosicaoApiService';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CadJogador({ route, navigation }) {
  const { colors } = useTheme();
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

  // Tema personalizado para os TextInput
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
      // await JogadorService.getJogadores(); 
      await JogadorApiService.getAll();
      // const posicoes = await PosicaoService.getAll();
      const posicoes = await PosicaoApiService.getAll();
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
      id: jogadorEdicao?._id, 
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
        // await JogadorService.update(jogador);
        await JogadorApiService.update(jogador);
        Alert.alert('Sucesso', 'Jogador atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('ListaJogador') }
        ]);
      } else {
        // await JogadorService.insert(jogador);
        await JogadorApiService.insert(jogador);
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
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>
          {editar ? 'EDITAR JOGADOR' : 'CADASTRAR JOGADOR'}
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
            label="NOME" 
            value={nome} 
            onChangeText={setNome} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            mode="outlined"
            theme={inputTheme}
          />
          
          <TextInput 
            label="IDADE" 
            value={idade} 
            onChangeText={setIdade} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
            mode="outlined"
            theme={inputTheme}
          />

          <DropDownPicker
            placeholder="SELECIONE UMA POSIÇÃO"
            open={open}
            value={posicao}
            items={items}
            setOpen={setOpen}
            setValue={setPosicao}
            setItems={setItems}
            listMode="SCROLLVIEW"
            style={[styles.input, styles.dropdown]}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            theme="DARK"
          />

          <TextInput 
            label="RITMO" 
            value={ritmo} 
            onChangeText={setRitmo} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
            mode="outlined"
            theme={inputTheme}
          />
          
          <TextInput 
            label="FINALIZAÇÃO" 
            value={finalizacao} 
            onChangeText={setFinalizacao} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
            mode="outlined"
            theme={inputTheme}
          />
          
          <TextInput 
            label="PASSE" 
            value={passe} 
            onChangeText={setPasse} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
            mode="outlined"
            theme={inputTheme}
          />
          
          <TextInput 
            label="CONDUÇÃO" 
            value={conducao} 
            onChangeText={setConducao} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
            mode="outlined"
            theme={inputTheme}
          />
          
          <TextInput 
            label="DEFESA" 
            value={defesa} 
            onChangeText={setDefesa} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
            mode="outlined"
            theme={inputTheme}
          />
          
          <TextInput 
            label="FÍSICO" 
            value={fisico} 
            onChangeText={setFisico} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
            mode="outlined"
            theme={inputTheme}
          />
          
          <TextInput 
            label="PREÇO (R$)" 
            value={preco} 
            onChangeText={setPreco} 
            style={[styles.input, { color: '#FFFFFF' }]} 
            keyboardType="numeric" 
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
  dropdown: {
    borderColor: '#0096FF',
    backgroundColor: 'rgba(20, 50, 90, 0.7)',
    minHeight: 50,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(20, 50, 90, 0.9)',
    borderColor: '#0096FF',
  },
  dropdownText: {
    color: '#FFFFFF',
  },
  dropdownLabel: {
    color: '#AAAAAA',
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
    marginTop: 20,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});