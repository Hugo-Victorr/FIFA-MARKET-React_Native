import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text, TextInput, Button, Title } from 'react-native-paper';
import AuthApiService from '../../API/AuthApiService';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const inputTheme = {
    colors: {
      primary: '#0096FF', // cor da borda quando focada
      background: 'rgba(20, 50, 90, 0.7)', // fundo do input
      text: '#FFFFFF', // cor do texto digitado (branco)
      placeholder: '#FFFFFF', // cor do placeholder agora branco
      placeholderTextColor: '#FFFFFF',  
      surface: 'rgba(20, 50, 90, 0.7)', // cor de fundo
      accent: '#0096FF', // cor de destaque
      onSurface: '#FFFFFF', // cor do texto
      onBackground: '#FFFFFF', // cor da label quando não está focada
      // cor da label quando não está focada (react-native-paper v5+)
      outline: '#0096FF',
      disabled: '#FFFFFF', // força cor branca quando desabilitado
    },
    roundness: 4,
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await AuthApiService.login(email, senha);
      if (response) {
        console.log('Login bem-sucedido:', response);
        navigation.replace('Home');
      } else {
        console.error('Login falhou, resposta inválida:', response);
        Alert.alert('Erro', 'Email ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.spacer} />
      <View style={styles.formContainer}>
        <Title style={styles.title}>LOGIN</Title>
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
              // Força label branca quando não está focado ou vazio
              placeholder: '#FFFFFF',
              text: '#FFFFFF',
              primary: '#0096FF',
              onSurfaceVariant: '#FFFFFF', // react-native-paper v5+
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
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={loading}
        >
          ENTRAR
        </Button>
        <Button
          mode="text"
          onPress={handleCadastro}
          style={styles.cadastroButton}
          labelStyle={styles.cadastroButtonLabel}
        >
          Não tem conta? Cadastre-se
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
    marginBottom: 32,
    // posiciona na parte inferior
    justifyContent: 'flex-end',
    // sombra para destaque
    shadowColor: '#0096FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  container: {
    flexBasis: '100%',
    padding: 10,
    backgroundColor: 'rgba(10, 31, 58, 0.85)',
  },
  spacer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    verticalAlign: 'middle',
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
