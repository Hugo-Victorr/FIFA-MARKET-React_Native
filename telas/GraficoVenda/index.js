import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Alert, ImageBackground } from 'react-native';
import { Card, Text, Title, Button } from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit'; 
import { Dimensions } from 'react-native';
// import VendaService from '../../Database/VendaService';
import VendaApiService from '../../API/VendaApiService';
// import VendaItemService from '../../Database/VendaItemService';
import VendaItemApiService from '../../API/VendaItemApiService';
// import JogadorService from '../../Database/JogadorService';
import JogadorApiService from '../../API/JogadorApiService';

const screenWidth = Dimensions.get('window').width;

export default function GraficoVenda({ navigation }) {
  const [jogadoresVendidos, setJogadoresVendidos] = useState([]);
  const [vendasPorPosicao, setVendasPorPosicao] = useState({ posicoes: [], quantidade: [] });
  
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // const itensVenda = await VendaItemService.getAll();
      const itensVenda = await VendaItemApiService.getAll();
      // const jogadores = await JogadorService.getJogadores();
      const jogadores = await JogadorApiService.getAll();
  
      const jogadorVendidoMap = {};
      const posicaoMap = {};
  
      itensVenda.forEach(item => {
        const jogador = jogadores.find(j => j._id === item.produto_id);
        if (!jogador) return;
  
        if (!jogadorVendidoMap[jogador.nome]) {
          jogadorVendidoMap[jogador.nome] = 0;
        }
        jogadorVendidoMap[jogador.nome] += item.quantidade;
  
        if (!posicaoMap[jogador.posicao]) {
          posicaoMap[jogador.posicao] = 0;
        }
        posicaoMap[jogador.posicao] += item.quantidade;
      });
  
      const jogadoresVendidosData = Object.keys(jogadorVendidoMap).map(nome => ({
        nome,
        quantidade: jogadorVendidoMap[nome]
      }));
  
      const posicoes = Object.keys(posicaoMap);
      const quantidadePorPosicao = Object.values(posicaoMap);
  
      setJogadoresVendidos(jogadoresVendidosData);
      setVendasPorPosicao({ posicoes, quantidade: quantidadePorPosicao });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar dados.');
    }
  };

  const jogadorQuantidades = jogadoresVendidos.map(jogador => jogador.quantidade);
  const jogadorNomes = jogadoresVendidos.map(jogador => jogador.nome);
  const { posicoes, quantidade } = vendasPorPosicao;

  if (!jogadoresVendidos.length || !posicoes.length) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  const pieData = posicoes.map((posicao, idx) => ({
    name: posicao,
    population: quantidade[idx],
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    legendFontColor: "#FFFFFF",
    legendFontSize: 12
  }));

  return (
    <ImageBackground 
      source={require('../../assets/fifa-background.jpg')} // Adicione um background apropriado
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Title style={styles.title}>DASHBOARDS</Title>

        <Button 
          mode="outlined" 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          labelStyle={styles.buttonText}
        >
          VOLTAR
        </Button>

        {/* Gráfico de quantidade de jogadores vendidos */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>JOGADORES VENDIDOS</Text>
            <BarChart
              data={{
                labels: jogadorNomes,
                datasets: [{ data: jogadorQuantidades }],
              }}
              width={screenWidth - 40}
              height={220}
              fromZero={true}
              showValuesOnTopOfBars={true}
              withInnerLines={true}
              withVerticalLabels={true}
              segments={Math.max(...jogadorQuantidades)}
              chartConfig={{
                backgroundColor: '#0a1f3a',
                backgroundGradientFrom: '#0a1f3a',
                backgroundGradientTo: '#14325a',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 150, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                fillShadowGradient: '#0096FF',
                fillShadowGradientOpacity: 1,
                propsForBackgroundLines: {
                  strokeWidth: 0.5,
                  stroke: 'rgba(255, 255, 255, 0.2)',
                },
              }}
              yAxisLabel=""
              yAxisSuffix=""
              yLabelsOffset={10}
              verticalLabelRotation={30}
            />
          </Card.Content>
        </Card>

        {/* Gráfico de vendas por posição */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>VENDAS POR POSIÇÃO</Text>
            <PieChart
              data={pieData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#0a1f3a',
                backgroundGradientFrom: '#0a1f3a',
                backgroundGradientTo: '#14325a',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={{ marginVertical: 10 }}
            />

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>RESUMO:</Text>
              <Text style={styles.summaryText}>Total de jogadores vendidos: {quantidade.reduce((a, b) => a + b, 0)}</Text>
              {posicoes.map((pos, idx) => (
                <Text key={idx} style={styles.summaryText}>{pos}: {quantidade[idx]}</Text>
              ))}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(0, 150, 255, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  card: {
    backgroundColor: 'rgba(20, 50, 90, 0.8)',
    borderRadius: 8,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(0, 150, 255, 0.3)',
    elevation: 5,
    shadowColor: '#0096FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  backButton: {
    backgroundColor: 'rgba(0, 150, 255, 0.2)',  
    borderColor: '#0096FF',                    
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 25,
    paddingVertical: 5,
  },  
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  summaryContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'rgba(0, 150, 255, 0.1)',
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#0096FF',
  },
  sumaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginVertical: 2,
  },
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});