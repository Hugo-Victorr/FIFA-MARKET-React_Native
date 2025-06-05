import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text, TextInput, Button, Title } from 'react-native-paper';
import AuthApiService from '../../API/AuthApiService';

const inputTheme = {
  colors: {
    primary: '#0096FF',
    background: 'rgba(20, 50, 90, 0.7)',
    text: '#FFFFFF',
    placeholder: '#FFFFFF',
    placeholderTextColor: '#FFFFFF',
    surface: 'rgba(20, 50, 90, 0.7)',
    accent: '#0096FF',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
    outline: '#0096FF',
    disabled: '#FFFFFF',
  },
  roundness: 4,
};

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
      await AuthApiService.register({ name: nome, email, age: idade, password: senha, confirmpassword: confirmarSenha });
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
      <View style={styles.formContainer}>
        <Title style={styles.title}>CADASTRO</Title>
        <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          style={[styles.input, { color: '#FFFFFF' }]}
          mode="outlined"
          theme={{
            ...inputTheme,
            colors: {
              ...inputTheme.colors,
              placeholder: '#FFFFFF',
              text: '#FFFFFF',
              primary: '#0096FF',
              onSurfaceVariant: '#FFFFFF',
              onSurface: '#FFFFFF',
            },
          }}
          underlineColor="transparent"
          selectionColor="#FFFFFF"
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          label="Idade"
          value={idade}
          onChangeText={setIdade}
          style={[styles.input, { color: '#FFFFFF' }]}
          mode="outlined"
          theme={{
            ...inputTheme,
            colors: {
              ...inputTheme.colors,
              placeholder: '#FFFFFF',
              text: '#FFFFFF',
              primary: '#0096FF',
              onSurfaceVariant: '#FFFFFF',
              onSurface: '#FFFFFF',
            },
          }}
          keyboardType="numeric"
          underlineColor="transparent"
          selectionColor="#FFFFFF"
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { color: '#FFFFFF' }]}
          mode="outlined"
          theme={{
            ...inputTheme,
            colors: {
              ...inputTheme.colors,
              placeholder: '#FFFFFF',
              text: '#FFFFFF',
              primary: '#0096FF',
              onSurfaceVariant: '#FFFFFF',
              onSurface: '#FFFFFF',
            },
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          underlineColor="transparent"
          selectionColor="#FFFFFF"
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          style={[styles.input, { color: '#FFFFFF' }]}
          mode="outlined"
          theme={{
            ...inputTheme,
            colors: {
              ...inputTheme.colors,
              placeholder: '#FFFFFF',
              text: '#FFFFFF',
              primary: '#0096FF',
              onSurfaceVariant: '#FFFFFF',
              onSurface: '#FFFFFF',
            },
          }}
          secureTextEntry
          underlineColor="transparent"
          selectionColor="#FFFFFF"
          placeholderTextColor="#FFFFFF"
        />
        <TextInput
          label="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          style={[styles.input, { color: '#FFFFFF' }]}
          mode="outlined"
          theme={{
            ...inputTheme,
            colors: {
              ...inputTheme.colors,
              placeholder: '#FFFFFF',
              text: '#FFFFFF',
              primary: '#0096FF',
              onSurfaceVariant: '#FFFFFF',
              onSurface: '#FFFFFF',
            },
          }}
          secureTextEntry
          underlineColor="transparent"
          selectionColor="#FFFFFF"
          placeholderTextColor="#FFFFFF"
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
          labelStyle={styles.cadastroButtonLabel}
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
  formContainer: {
    backgroundColor: 'rgba(10, 31, 58, 0.85)',
    borderColor: '#0096FF',
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 32,
    shadowColor: '#0096FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    backgroundColor: 'rgba(20, 50, 90, 0.7)',
    marginBottom: 15,
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
  cadastroButtonLabel: {
    color: '#0096FF',
    fontWeight: 'bold',
  },
});
