import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View, ImageBackground } from 'react-native';
import { Card, Text, Button, Title, FAB, Badge } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import VendaApiService from '../../API/VendaApiService';
import VendaItemApiService from '../../API/VendaItemApiService';
import JogadorApiService from '../../API/JogadorApiService';
import PosicaoApiService from '../../API/PosicaoApiService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ListaVenda({ navigation }) {
  const [vendas, setVendas] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const [posicoes, setPosicoes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      //await VendaService.deleteTable();
      //await VendaItemService.deleteTable();
      // const listaPosicoes = await PosicaoService.getAll();
      const listaPosicoes = await PosicaoApiService.getAll();
      const formatado = [
        { label: 'TODAS AS POSIÇÕES', value: null }, 
        ...listaPosicoes.map(p => ({ label: p.nome.toUpperCase(), value: p.nome }))
      ];
      setPosicoes(formatado);
      carregarVendas(); 
    };
    carregar();
  }, []);

  useEffect(() => {
    carregarVendas();
  }, [filtro]);

  const carregarVendas = async () => {
    try {
      // const listaVendas = await VendaService.getAll(); 
      const listaVendas = await VendaApiService.getAll(); 
      const vendasComItens = [];

      for (const venda of listaVendas) {
        let itens = await VendaItemApiService.getItensDaVenda(venda._id);
        if (!Array.isArray(itens)) itens = [];
        const itensDetalhados = await Promise.all(
          itens.map(async item => {
            const jogador = await JogadorApiService.getById(item.produto_id);
            return {
              ...item,
              nome: jogador?.nome,
              posicao: jogador?.posicao,
            };
          })
        );

        if (!filtro || itensDetalhados.some(i => i.posicao === filtro)) {
          vendasComItens.push({ ...venda, itens: itensDetalhados });
        }
      }

      setVendas(vendasComItens);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar vendas. ERRO: ' + error);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>VENDAS REALIZADAS</Title>

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
          value={filtro}
          items={posicoes}
          setOpen={setOpen}
          setValue={setFiltro}
          setItems={setPosicoes}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          labelStyle={styles.dropdownLabel}
          listMode="SCROLLVIEW"
          theme="DARK"
        />

        {vendas.map(venda => (
          <Card key={venda._id} style={styles.card}>
            <Card.Content>
              <View style={styles.vendaHeader}>
                <View>
                  <Text style={styles.vendaText}>
                    <Text style={styles.label}>DATA: </Text>
                    <Text style={styles.value}>{new Date(venda.data).toLocaleDateString('pt-BR')}</Text>
                  </Text>
                  <Text style={styles.vendaText}>
                    <Text style={styles.label}>PAGAMENTO: </Text>
                    <Text style={styles.value}>{venda.forma_pagamento.toUpperCase()}</Text>
                  </Text>
                </View>
                <Text style={styles.totalVenda}>
                  <Text style={styles.label}>TOTAL: </Text>
                  <Text style={styles.totalValue}>R$ {venda.total.toFixed(2)}</Text>
                </Text>
              </View>

              <Text style={styles.itensTitle}>ITENS:</Text>
              
              {venda.itens.map((item, idx) => (
                <Card key={idx} style={styles.itemCard}>
                  <Card.Content>
                    <Text style={styles.itemName}>{item.nome.toUpperCase()}</Text>
                    <Text style={styles.itemText}>
                      <Text style={styles.label}>POSIÇÃO: </Text>
                      <Text style={styles.value}>{item.posicao}</Text>
                    </Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemText}>
                        <Text style={styles.label}>QTD: </Text>
                        <Text style={styles.value}>{item.quantidade}</Text>
                      </Text>
                      <Text style={styles.itemText}>
                        <Text style={styles.label}>UNIT: </Text>
                        <Text style={styles.priceValue}>R$ {item.preco_unit.toFixed(2)}</Text>
                      </Text>
                      <Text style={styles.itemText}>
                        <Text style={styles.label}>SUBTOTAL: </Text>
                        <Text style={styles.priceValue}>R$ {item.subtotal.toFixed(2)}</Text>
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB
          style={styles.fab}
          icon="chart-bar"
          onPress={() => navigation.navigate('GraficoVenda')}
          color="#FFFFFF"
        />
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
    paddingBottom: 80,
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
  backButton: {
    backgroundColor: '#0096FF',
    borderColor: '#00B4FF',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
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
  vendaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  vendaText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  totalVenda: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  totalValue: {
    color: '#00FF87',
    fontWeight: 'bold',
  },
  label: {
    color: '#CCCCCC',
  },
  value: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  priceValue: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  itensTitle: {
    marginTop: 15,
    marginBottom: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 150, 255, 0.3)',
    paddingTop: 10,
  },
  itemCard: {
    marginBottom: 10,
    backgroundColor: 'rgba(30, 60, 110, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.2)',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 13,
    color: '#CCCCCC',
    marginBottom: 3,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#0096FF',
  },
});