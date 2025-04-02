import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View, ImageBackground } from 'react-native';
import { Card, Text, Button, Title, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JogadorService from '../../Database/JogadorService';
import PosicaoService from '../../Database/PosicaoService';
import VendaService from '../../Database/VendaService';
import VendaItemService from '../../Database/VendaItemService';
import CountButton from '../../Componentes/CountButton'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CarrinhoModal from '../../Componentes/CarrinhoModal';
import { FAB, Badge } from 'react-native-paper';


export default function CompraJogador({ navigation }) {
  const [jogadores, setJogadores] = useState([]);
  const [filteredJogadores, setFilteredJogadores] = useState([]); 
  const [quantidades, setQuantidades] = useState({});

  const [open, setOpen] = useState(false);
  const [filtroPosicao, setFiltroPosicao] = useState(null);
  const [posicoes, setPosicoes] = useState([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [carrinhoQtd, setCarrinhoQtd] = useState(0);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', atualizarCarrinho);
    atualizarCarrinho();
    return unsubscribe;
  }, [navigation]);
  
  const atualizarCarrinho = async () => {
    const carrinhoStr = await AsyncStorage.getItem('carrinho');
    const carrinho = carrinhoStr ? JSON.parse(carrinhoStr) : [];
    setCarrinhoQtd(carrinho.reduce((acc, item) => acc + item.quantidade, 0));
  };

  useEffect(() => {
    carregarPosicoes();
    carregarJogadores();
  }, []);

  useEffect(() => {
    if (filtroPosicao && filtroPosicao !== 'TODAS') {
      const filtrado = jogadores.filter(j => j.posicao === filtroPosicao);
      setFilteredJogadores(filtrado);
    } else {
      setFilteredJogadores(jogadores);
    }
  }, [filtroPosicao, jogadores]);

  const carregarPosicoes = async () => {
    const lista = await PosicaoService.getAll();
    const formatado = [{ label: 'TODAS AS POSIÇÕES', value: 'TODAS' }, ...lista.map(p => ({ label: p.nome.toUpperCase(), value: p.nome }))];
    setPosicoes(formatado);
  };

  const carregarJogadores = async () => {
    try {
      const lista = await JogadorService.getJogadores();
      setJogadores(lista);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os jogadores');
    }
  };

  const handleQuantidadeChange = (id, value) => {
    setQuantidades(prev => ({ ...prev, [id]: value }));
  };

  const handleComprar = async (jogador) => {
    const quantidade = parseInt(quantidades[jogador.id] || '1');
    if (quantidade < 1) {
      Alert.alert('Erro', 'Quantidade inválida.');
      return;
    }
  
    try {
      const carrinhoStr = await AsyncStorage.getItem('carrinho');
      const carrinho = carrinhoStr ? JSON.parse(carrinhoStr) : [];
  
      // Verifica se o item já está no carrinho
      const itemExistente = carrinho.find(item => item.produto_id === jogador.id);
      
      if (itemExistente) {
        // Atualiza a quantidade se já existir
        itemExistente.quantidade += quantidade;
        itemExistente.subtotal = itemExistente.preco_unit * itemExistente.quantidade;
      } else {
        // Adiciona novo item
        carrinho.push({
          produto_id: jogador.id,
          nome: jogador.nome,
          preco_unit: jogador.preco,
          quantidade,
          subtotal: jogador.preco * quantidade
        });
      }
  
      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));
      atualizarCarrinho(); // Atualiza o badge imediatamente
      
      Alert.alert('Sucesso', `${jogador.nome} adicionado ao carrinho!`);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar ao carrinho.');
    }
  };

  const handleFinalizarCompra = async () => {
    try {
      const carrinhoStr = await AsyncStorage.getItem('carrinho'); 
      const carrinho = carrinhoStr ? JSON.parse(carrinhoStr) : [];

      if (carrinho.length === 0) {
        Alert.alert('Carrinho vazio', 'Adicione jogadores antes de finalizar a compra.');
        return;
      }

      const total = carrinho.reduce((sum, item) => sum + item.subtotal, 0);
      const data = new Date().toISOString();
      const forma_pagamento = 'Cartão';

      const venda = { data, total, forma_pagamento };
      await VendaService.insert(venda);

      const vendas = await VendaService.getAll();
      const ultimaVenda = vendas[vendas.length - 1];
      const venda_id = ultimaVenda.id;

      for (const item of carrinho) {
        const itemVenda = {
          venda_id,
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unit: item.preco_unit,
          subtotal: item.subtotal
        };
        await VendaItemService.insert(itemVenda);
      } 
      
      Alert.alert('Compra Finalizada', 'Sua compra foi registrada com sucesso!', [
        { text: 'Continuar Comprando'},
        { text: 'Ver Compras', onPress: () => navigation.navigate('ListaVenda') }, 
      ]);
      
      await AsyncStorage.removeItem('carrinho');
      setQuantidades({});
      
    } catch (error) {
      Alert.alert('Erro', 'Erro ao finalizar a compra.');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>COMPRAR JOGADORES</Title>

        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          labelStyle={styles.buttonText}
        >
          VOLTAR
        </Button>

        <DropDownPicker
          placeholder="FILTRAR POR POSIÇÃO"
          open={open}
          value={filtroPosicao}
          items={posicoes}
          setOpen={setOpen}
          setValue={setFiltroPosicao}
          setItems={setPosicoes}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownLabel}
          listMode="SCROLLVIEW"
          theme="DARK"
        />

        {filteredJogadores.map((jogador) => (
          <Card key={jogador.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.playerName}>{jogador.nome.toUpperCase()}</Text>
              <View style={styles.playerInfo}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoText}>POSIÇÃO: <Text style={styles.infoValue}>{jogador.posicao}</Text></Text>
                  <Text style={styles.infoText}>IDADE: <Text style={styles.infoValue}>{jogador.idade}</Text></Text>
                  <Text style={styles.infoText}>PREÇO: <Text style={styles.priceValue}>R$ {jogador.preco.toFixed(2)}</Text></Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoText}>RITMO: <Text style={styles.statValue}>{jogador.ritmo}</Text></Text>
                  <Text style={styles.infoText}>FINALIZAÇÃO: <Text style={styles.statValue}>{jogador.finalizacao}</Text></Text>
                  <Text style={styles.infoText}>PASSE: <Text style={styles.statValue}>{jogador.passe}</Text></Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoText}>CONDUÇÃO: <Text style={styles.statValue}>{jogador.conducao}</Text></Text>
                  <Text style={styles.infoText}>DEFESA: <Text style={styles.statValue}>{jogador.defesa}</Text></Text>
                  <Text style={styles.infoText}>FÍSICO: <Text style={styles.statValue}>{jogador.fisico}</Text></Text>
                </View>
              </View>

              <View style={styles.actions}>
              <CountButton
  value={parseInt(quantidades[jogador.id] || 1)}
  onIncrease={() => {
    const current = parseInt(quantidades[jogador.id] || 1);
    handleQuantidadeChange(jogador.id, current + 1);
  }}
  onDecrease={() => {
    const current = parseInt(quantidades[jogador.id] || 1);
    if (current > 1) {
      handleQuantidadeChange(jogador.id, current - 1);
    }
  }}
  min={1}
  max={99}
/>
                <Button 
                  mode="contained" 
                  onPress={() => handleComprar(jogador)}
                  style={styles.buyButton}
                  labelStyle={styles.buttonText}
                >
                  COMPRAR
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}

        <Button 
          mode="contained" 
          onPress={handleFinalizarCompra} 
          style={styles.checkoutButton}
          labelStyle={styles.buttonText}
        >
          FINALIZAR COMPRA
        </Button>
      </ScrollView>
      {modalVisivel && (
  <CarrinhoModal
  visible={modalVisivel}
  onClose={() => {
    setModalVisivel(false);
    atualizarCarrinho();
  }}
  onUpdate={atualizarCarrinho}
/>
)}

<FAB
  icon="cart"
  style={styles.fab}
  onPress={() => setModalVisivel(true)}
  color="#fff"
/>

{carrinhoQtd > 0 && (
  <Badge style={styles.badge}>{carrinhoQtd}</Badge>
)}
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
  backButton: {
    backgroundColor: '#0096FF',
    borderColor: '#00B4FF',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingVertical: 5,
  },
  dropdown: {
    backgroundColor: 'rgba(20, 50, 90, 0.7)',
    borderColor: '#0096FF',
    marginBottom: 15,
    zIndex: 10,
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
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoColumn: {
    flex: 1,
    paddingHorizontal: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  infoValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statValue: {
    color: '#00FF87',
    fontWeight: 'bold',
  },
  priceValue: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10, 
  },
  input: {
    width: 80,
    backgroundColor: 'rgba(20, 50, 90, 0.7)',
  },
  buyButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#00C853',
    borderColor: '#00E676',
    borderWidth: 1,
    borderRadius: 4,
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#FFA000',
    borderColor: '#FFC107',
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#0096FF',
  },
  badge: {
    position: 'absolute',
    right: 15,
    bottom: 75,
    backgroundColor: '#FFD700',
    color: 'gray',
    fontWeight: 'bold',
  }
});