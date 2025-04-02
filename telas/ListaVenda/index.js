import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import { Card, Text, Button, Title, FAB } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import VendaService from '../../Database/VendaService';
import VendaItemService from '../../Database/VendaItemService';
import JogadorService from '../../Database/JogadorService';
import PosicaoService from '../../Database/PosicaoService';

export default function ListaVenda({ navigation }) {
  const [vendas, setVendas] = useState([]);
  const [filtro, setFiltro] = useState(null);
  const [posicoes, setPosicoes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const carregar = async () => {
        await VendaService.init();
        await VendaItemService.init();
      const listaPosicoes = await PosicaoService.getAll();
      const formatado = [{ label: 'Todas as posições', value: null }, ...listaPosicoes.map(p => ({ label: p.nome, value: p.nome }))];
      setPosicoes(formatado);
      carregarVendas(); 
    };
    carregar();
  }, []);

  const carregarVendas = async () => {
    try {
      const listaVendas = await VendaService.getAll();
      const vendasComItens = [];

      for (const venda of listaVendas) {
        const itens = await VendaItemService.getItensDaVenda(venda.id);
        const itensDetalhados = await Promise.all(
          itens.map(async item => {
            const jogador = await JogadorService.getJogadorById(item.produto_id);
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
      Alert.alert('Erro', 'Erro ao carregar vendas.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Vendas Realizadas</Title>

      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.backButton}>
        Voltar
      </Button>

      <DropDownPicker
        placeholder="Filtrar por posição"
        open={open}
        value={filtro}
        items={posicoes}
        setOpen={setOpen}
        setValue={setFiltro}
        setItems={setPosicoes}
        onChangeValue={carregarVendas}
        listMode="SCROLLVIEW"
        style={styles.dropdown}
      />

      {vendas.map(venda => (
        <Card key={venda.id} style={styles.card}>
          <Card.Content>
            <Text>Data: {new Date(venda.data).toLocaleString()}</Text>
            <Text>Forma de Pagamento: {venda.forma_pagamento}</Text>
            <Text>Total: R$ {venda.total.toFixed(2)}</Text>
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Itens:</Text>
            {venda.itens.map((item, idx) => (
              <View key={idx} style={{ marginBottom: 5 }}>
                <Text>{item.nome} ({item.posicao})</Text>
                <Text>Qtd: {item.quantidade} | Unit: R$ {item.preco_unit.toFixed(2)} | Subtotal: R$ {item.subtotal.toFixed(2)}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}

      {/* Floating Action Button com ícone de gráfico */}
      <FAB
        style={styles.fab}
        small
        icon="chart-bar" // Ícone de gráfico
        onPress={() => navigation.navigate('GraficoVenda')} // Navega para a tela de relatórios
      />
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
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
    padding: 10,
  },
  dropdown: {
    marginBottom: 15,
    zIndex: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
