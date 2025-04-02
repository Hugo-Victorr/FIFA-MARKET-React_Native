import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit'; 
import { Dimensions } from 'react-native';
import VendaService from '../../Database/VendaService';
import VendaItemService from '../../Database/VendaItemService';
import JogadorService from '../../Database/JogadorService';

const screenWidth = Dimensions.get('window').width;

export default function GraficoVenda({ navigation }) {
  const [jogadoresVendidos, setJogadoresVendidos] = useState([]); // Inicializado como array vazio
  const [vendasPorPosicao, setVendasPorPosicao] = useState({ posicoes: [], quantidade: [] }); // Inicializado com objetos vazios
  
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const itensVenda = await VendaItemService.getAll(); // Pega todos os itens vendidos diretamente
      const jogadores = await JogadorService.getJogadores(); // Lista completa de jogadores
  
      const jogadorVendidoMap = {}; // { jogadorId: quantidade }
      const posicaoMap = {};        // { posicao: quantidade }
  
      itensVenda.forEach(item => {
        const jogador = jogadores.find(j => j.id === item.produto_id);
        if (!jogador) return;
  
        // Contabiliza por jogador
        if (!jogadorVendidoMap[jogador.nome]) {
          jogadorVendidoMap[jogador.nome] = 0;
        }
        jogadorVendidoMap[jogador.nome] += item.quantidade;
  
        // Contabiliza por posição
        if (!posicaoMap[jogador.posicao]) {
          posicaoMap[jogador.posicao] = 0;
        }
        posicaoMap[jogador.posicao] += item.quantidade;
      });
  
      // Preparar dados para gráfico de barra (jogadores vendidos)
      const jogadoresVendidosData = Object.keys(jogadorVendidoMap).map(nome => ({
        nome,
        quantidade: jogadorVendidoMap[nome]
      }));
  
      // Preparar dados para gráfico de pizza (posições)
      const posicoes = Object.keys(posicaoMap);
      const quantidadePorPosicao = Object.values(posicaoMap);
  
      setJogadoresVendidos(jogadoresVendidosData);
      setVendasPorPosicao({ posicoes, quantidade: quantidadePorPosicao });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar dados.');
    }
  };

  // Gráfico de quantidade de jogadores vendidos
  const jogadorQuantidades = jogadoresVendidos.map(jogador => jogador.quantidade);
  const jogadorNomes = jogadoresVendidos.map(jogador => jogador.nome);

  // Gráfico de vendas por posição
  const { posicoes, quantidade } = vendasPorPosicao;

  // Condicional para evitar erro antes de carregar os dados
  if (!jogadoresVendidos.length || !posicoes.length) {
    return <Text>Carregando dados...</Text>;
  }

  // Preparando os dados para o gráfico de pizza
  const pieData = posicoes.map((posicao, idx) => ({
    name: posicao,
    population: quantidade[idx],
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Gerando uma cor aleatória
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>Dashboards</Title>

      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.backButton}>
        Voltar para Lista de Vendas
        </Button>

      {/* Gráfico de quantidade de jogadores vendidos */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Quantidade de Jogadores Vendidos</Text>
        <BarChart
  data={{
    labels: jogadorNomes,
    datasets: [
      {
        data: jogadorQuantidades,
      },
    ],
  }}
  width={screenWidth - 40}
  height={220}
  fromZero={true}
  showValuesOnTopOfBars={true}
  withInnerLines={true}
  withVerticalLabels={true}
  segments={Math.max(...jogadorQuantidades)} // número de linhas do eixo Y
  chartConfig={{
    backgroundColor: '#f5f5f5',
    backgroundGradientFrom: '#e1e1e1',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    fillShadowGradient: '#4287f5',
    fillShadowGradientOpacity: 1,
    propsForBackgroundLines: {
      strokeDasharray: '', // linha contínua
    },
  }}
  yAxisLabel=""
  yAxisSuffix=""
  yLabelsOffset={10}
  verticalLabelRotation={30}
/>
      </View>

      {/* Gráfico de vendas por posição (Gráfico de Pizza) */}
      <View style={styles.chartContainer}>
  <Text style={styles.chartTitle}>Vendas por Posição</Text>
  <PieChart
    data={pieData}
    width={screenWidth - 40}
    height={220}
    chartConfig={{
      backgroundColor: '#f5f5f5',
      backgroundGradientFrom: '#e1e1e1',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    accessor="population"
    backgroundColor="transparent"
    style={{ marginVertical: 20 }}
  />

  {/* Descrição abaixo do gráfico */}
  <View style={{ marginTop: 10 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Resumo:</Text>
    <Text>Total de jogadores vendidos: {quantidade.reduce((a, b) => a + b, 0)}</Text>
    {posicoes.map((pos, idx) => (
      <Text key={idx}>{pos}: {quantidade[idx]}</Text>
    ))}
  </View>
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  chartContainer: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
