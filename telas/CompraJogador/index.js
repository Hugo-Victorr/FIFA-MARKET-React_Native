import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import { Card, Text, Button, Title, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JogadorService from '../../Database/JogadorService';
import PosicaoService from '../../Database/PosicaoService';
import VendaService from '../../Database/VendaService';
import VendaItemService from '../../Database/VendaItemService';

export default function CompraJogador() {
  const [jogadores, setJogadores] = useState([]);
  const [filteredJogadores, setFilteredJogadores] = useState([]);
  const [quantidades, setQuantidades] = useState({});

  const [open, setOpen] = useState(false);
  const [filtroPosicao, setFiltroPosicao] = useState(null);
  const [posicoes, setPosicoes] = useState([]);

  useEffect(() => {
    carregarPosicoes();
    carregarJogadores();
  }, []);

  useEffect(() => {
    if (filtroPosicao) {
      const filtrado = jogadores.filter(j => j.posicao === filtroPosicao);
      setFilteredJogadores(filtrado);
    } else {
      setFilteredJogadores(jogadores);
    }
  }, [filtroPosicao, jogadores]);

  const carregarPosicoes = async () => {
    const lista = await PosicaoService.getAll();
    const formatado = lista.map(p => ({ label: p.nome, value: p.nome }));
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

      const novoItem = {
        produto_id: jogador.id,
        nome: jogador.nome,
        preco_unit: jogador.preco,
        quantidade,
        subtotal: jogador.preco * quantidade
      };

      carrinho.push(novoItem);
      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinho));

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
      await VendaService.insertVenda(venda);

      const vendas = await VendaService.getVendas();
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
        await insertVendaItem(itemVenda);
      }

      await AsyncStorage.removeItem('carrinho');
      setQuantidades({});
      
      Alert.alert('Compra Finalizada', 'Sua compra foi registrada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao finalizar a compra.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Comprar Jogadores</Title>

      <DropDownPicker
        placeholder="Filtrar por posição"
        open={open}
        value={filtroPosicao}
        items={posicoes}
        setOpen={setOpen}
        setValue={setFiltroPosicao}
        setItems={setPosicoes}
        style={styles.dropdown}
        listMode="SCROLLVIEW"
      />

      {filteredJogadores.map((jogador) => (
        <Card key={jogador.id} style={styles.card}>
          <Card.Content>
            <Text>Nome: {jogador.nome}</Text>
            <Text>Posição: {jogador.posicao}</Text>
            <Text>Idade: {jogador.idade}</Text>
            <Text>Preço: R$ {jogador.preco.toFixed(2)}</Text>
            <Text>Ritmo: {jogador.ritmo}</Text>
            <Text>Finalização: {jogador.finalizacao}</Text>
            <Text>Passe: {jogador.passe}</Text>
            <Text>Condução: {jogador.conducao}</Text>
            <Text>Defesa: {jogador.defesa}</Text>
            <Text>Físico: {jogador.fisico}</Text>

            <View style={styles.actions}>
              <TextInput
                label="Qtd"
                value={quantidades[jogador.id] || ''}
                onChangeText={value => handleQuantidadeChange(jogador.id, value)}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              <Button mode="contained" onPress={() => handleComprar(jogador)}>
                Comprar
              </Button>
            </View>
          </Card.Content>
        </Card>
      ))}

      <Button mode="contained" onPress={handleFinalizarCompra} style={{ marginTop: 20 }}>
        Finalizar Compra
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  dropdown: {
    marginBottom: 15,
    zIndex: 10
  },
  card: {
    marginBottom: 15,
    padding: 10,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  input: {
    width: 80,
    marginRight: 10,
  },
});
