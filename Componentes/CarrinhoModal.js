import React, { useEffect, useState } from 'react';
import { View, Modal, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountButton from './CountButton'; // Ajuste o caminho conforme necessário

export default function CarrinhoModal({ visible, onClose, onUpdate }) {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    if (visible) carregarCarrinho();
  }, [visible]);

  const carregarCarrinho = async () => {
    const data = await AsyncStorage.getItem('carrinho');
    setCarrinho(data ? JSON.parse(data) : []);
  };

  const atualizarQuantidade = async (id, novaQuantidade) => {
    const novoCarrinho = carrinho.map(item => {
      if (item.produto_id === id) {
        return {
          ...item,
          quantidade: novaQuantidade,
          subtotal: item.preco_unit * novaQuantidade
        };
      }
      return item;
    });
    
    await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
    onUpdate();
  };

  const removerItem = async (id) => {
    const novoCarrinho = carrinho.filter(item => item.produto_id !== id);
    await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
    onUpdate();
  };

  const total = carrinho.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>CARRINHO</Text>

            <FlatList
              data={carrinho}
              keyExtractor={(item) => item.produto_id.toString()}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  <Card.Content>
                    <Text style={styles.playerName}>{item.nome.toUpperCase()}</Text>
                    
                    <View style={styles.itemInfo}>
                      <Text style={styles.infoText}>PREÇO UNITÁRIO: <Text style={styles.priceValue}>R$ {item.preco_unit.toFixed(2)}</Text></Text>
                      
                      <View style={styles.quantityContainer}>
                        <Text style={styles.infoText}>QUANTIDADE: </Text>
                        <CountButton
                          value={item.quantidade}
                          onIncrease={() => atualizarQuantidade(item.produto_id, item.quantidade + 1)}
                          onDecrease={() => {
                            if (item.quantidade > 1) {
                              atualizarQuantidade(item.produto_id, item.quantidade - 1);
                            } else {
                              removerItem(item.produto_id);
                            }
                          }}
                          min={1}
                          max={99}
                        />
                      </View>
                      
                      <Text style={styles.infoText}>SUBTOTAL: <Text style={styles.priceValue}>R$ {item.subtotal.toFixed(2)}</Text></Text>
                    </View>

                    <IconButton 
                      icon="delete" 
                      onPress={() => removerItem(item.produto_id)}
                      style={styles.deleteButton}
                      iconColor="#FF5252"
                    />
                  </Card.Content>
                </Card>
              )}
            />

            <View style={styles.footer}>
              <Text style={styles.total}>TOTAL: <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text></Text>
              
              <Button 
                mode="contained" 
                onPress={onClose} 
                style={styles.closeButton}
                labelStyle={styles.buttonText}
              >
                FECHAR
              </Button>
            </View>
          </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(10, 31, 58, 0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'rgba(20, 50, 90, 0.9)',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
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
  card: {
    marginBottom: 15,
    backgroundColor: 'rgba(30, 60, 110, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  itemInfo: {
    marginVertical: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  priceValue: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255, 82, 82, 0.2)',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 150, 255, 0.3)',
    paddingTop: 15,
  },
  total: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'right',
    marginBottom: 15,
  },
  totalValue: {
    color: '#00FF87',
    fontWeight: 'bold',
    fontSize: 20,
  },
  closeButton: {
    backgroundColor: '#0096FF',
    borderColor: '#00B4FF',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});