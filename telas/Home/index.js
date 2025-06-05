import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { Text, Title, Button, Portal, Dialog } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatabaseService from '../../Database/DatabaseService';
import ApiService from '../../API/ApiService';
import AuthApiService from '../../API/AuthApiService';

let globalSound = null;
let isMusicPlaying = false;

export default function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [musicState, setMusicState] = useState(false);
  const [userDialogVisible, setUserDialogVisible] = useState(false);
  const currentUser = ApiService.getUser();
  console.log('Usuário atual:', currentUser);

  useEffect(() => {
      //DatabaseService.deleteTable();
      // DatabaseService.init();
    }, []);

  const menuItems = [
    { 
      title: 'JOGADORES', 
      icon: 'account-group',
      onPress: () => navigation.navigate('ListaJogador')
    },
    { 
      title: 'POSIÇÕES', 
      icon: 'soccer-field',
      onPress: () => navigation.navigate('ListaPosicao')
    },
    { 
      title: 'COMPRAR', 
      icon: 'cart',
      onPress: () => navigation.navigate('CompraJogador')
    },
    { 
      title: 'VENDAS', 
      icon: 'cash',
      onPress: () => navigation.navigate('ListaVenda')
    }
  ];

  const loadBackgroundMusic = async () => {
    if (globalSound) return;

    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/bomba-patch.mp3'),
        { shouldPlay: true, isLooping: true }
      );

      globalSound = sound;
      isMusicPlaying = true;
      setMusicState(true);
    } catch (error) {
      console.log('Erro ao carregar música:', error);
    }
  };

  const toggleMusic = async () => {
    if (!globalSound) {
      await loadBackgroundMusic();
      return;
    }

    if (isMusicPlaying) {
      await globalSound.pauseAsync();
      isMusicPlaying = false;
    } else {
      await globalSound.playAsync();
      isMusicPlaying = true;
    }
    setMusicState(isMusicPlaying);
  };

  useEffect(() => {
    if (isFocused) {
      loadBackgroundMusic();
    }

    return () => {
    };
  }, [isFocused]);

  useEffect(() => {
    return () => {
      if (globalSound) {
        globalSound.unloadAsync();
        globalSound = null;
        isMusicPlaying = false;
      }
    };
  }, []);

  const handleLogout = () => {
    AuthApiService.logout();
    navigation.replace('Login');
  };

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.userButton}
          onPress={() => setUserDialogVisible(true)}
        >
          <Icon 
            name="account-circle" 
            size={24} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>

        <View style={styles.spacer} />
        <Title style={styles.title}>FIFA MARKET™</Title>
        
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuButton}
              onPress={item.onPress}
            >
              <View style={styles.buttonContent}>
                <Icon 
                  name={item.icon} 
                  size={40} 
                  color="#FFFFFF" 
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.musicButton}
          onPress={toggleMusic}
        >
          <Icon 
            name={musicState ? 'volume-high' : 'volume-off'} 
            size={24} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>

        <Portal>
          <Dialog
            visible={userDialogVisible}
            onDismiss={() => setUserDialogVisible(false)}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogTitle}>Perfil do Usuário</Dialog.Title>
            <Dialog.Content>
              <View style={styles.userInfo}>
                <Icon name="account" size={50} color="#0096FF" style={styles.userIcon} />
                <Text style={styles.userInfoText}>Nome: {currentUser?.name}</Text>
                <Text style={styles.userInfoText}>Idade: {currentUser?.age}</Text>
                <Text style={styles.userInfoText}>Email: {currentUser?.email}</Text>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button 
                onPress={handleLogout} 
                textColor="#FF4444"
                style={styles.logoutButton}
              >
                Sair
              </Button>
              <Button 
                onPress={() => setUserDialogVisible(false)}
                textColor="#0096FF"
              >
                Fechar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    padding: 20,
    backgroundColor: 'rgba(10, 31, 58, 0.85)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 150, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  spacer: {
    flex: 1,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 15,
    backgroundColor: 'rgba(0, 150, 255, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(0, 180, 255, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0096FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonIcon: {
    marginBottom: 10,
    textShadowColor: 'rgba(0, 150, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },  musicButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'rgba(0, 150, 255, 0.7)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  userButton: {
    position: 'absolute',
    right: 20,
    top: 80,
    backgroundColor: 'rgba(0, 150, 255, 0.7)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1,
  },
  dialog: {
    backgroundColor: 'rgba(10, 31, 58, 0.95)',
    borderWidth: 2,
    borderColor: '#0096FF',
    borderRadius: 16,
  },
  dialogTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
    padding: 20,
  },
  userIcon: {
    marginBottom: 20,
  },
  userInfoText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    marginRight: 8,
  },
});