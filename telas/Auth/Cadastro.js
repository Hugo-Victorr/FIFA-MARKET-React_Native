import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text, TextInput, Button, Title } from 'react-native-paper';
import AuthApiService from '../../API/AuthApiService';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !idade || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await AuthApiService.register({ name: nome, email, password: senha, confirmpassword: confirmarSenha });
      Alert.alert('Cadastro', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Title style={styles.title}>CADASTRO</Title>
        <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          label="Idade"
          value={idade}
          onChangeText={setIdade}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          label="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          style={styles.input}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={handleCadastro}
          style={styles.button}
          loading={loading}
        >
          REGISTRAR
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.replace('Login')}
          style={styles.cadastroButton}
        >
          Já tem conta? Entrar
        </Button>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(10, 31, 58, 0.85)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 150, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  button: {
    width: '100%',
    backgroundColor: '#0096FF',
    borderRadius: 4,
    marginBottom: 10,
  },
  cadastroButton: {
    width: '100%',
  },
});
