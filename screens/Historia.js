import React, { useState, useCallback } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, TextInput, Alert
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';

const curiosidadesIniciais = [
  'Cleópatra viveu mais perto da invenção do iPhone do que da construção das pirâmides.\n\nAs pirâmides foram construídas cerca de 2.500 a.C., e Cleópatra viveu por volta de 30 a.C. — ou seja, mais de 2.000 anos antes do iPhone!',
  'O primeiro contrato de trabalho registrado foi feito na Mesopotâmia há cerca de 4.000 anos!',
  'A Universidade de Al Qarawiyyin, no Marrocos, fundada em 859, é considerada a universidade mais antiga do mundo ainda em funcionamento.',
  'O Grande Incêndio de Londres, em 1666, destruiu 80% da cidade, mas matou apenas 6 pessoas oficialmente registradas.',
];

const Historia = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [curiosidades, setCuriosidades] = useState(curiosidadesIniciais);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(curiosidades[0]);

  // Função para carregar curiosidades da API
  const carregarCuriosidades = async () => {
    try {
      const response = await api.get('/curiosidades/categoria/HISTORIA');
      if (response.data && response.data.length > 0) {
        const curiosidadesAPI = response.data.map(item => item.texto);
        setCuriosidades(curiosidadesAPI);
        setIndiceAtual(0);
        setTextoEditado(curiosidadesAPI[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar curiosidades:', error);
      Alert.alert('Erro', 'Não foi possível carregar as curiosidades.');
    }
  };

  // Carrega as curiosidades quando o componente é montado
  React.useEffect(() => {
    carregarCuriosidades();
  }, []);

  // Atualiza texto editável quando muda a curiosidade
  React.useEffect(() => {
    setTextoEditado(curiosidades[indiceAtual]);
  }, [indiceAtual, curiosidades]);

  // Verifica se veio nova curiosidade da tela de adicionar
  useFocusEffect(
    useCallback(() => {
      if (route.params?.novaCuriosidade) {
        setCuriosidades(current => [...current, route.params.novaCuriosidade]);
        setIndiceAtual(curiosidades.length); // Vai pra última
        navigation.setParams({ novaCuriosidade: undefined }); // Limpa o parâmetro
      }
    }, [route.params?.novaCuriosidade])
  );

  const salvarEdicao = async () => {
    try {
      // Envia a curiosidade para a API
      await api.post('/curiosidades', {
        texto: textoEditado,
        categoria: 'HISTORIA'
      });

      // Atualiza o estado local
      setCuriosidades(current => {
        const copia = [...current];
        copia[indiceAtual] = textoEditado;
        return copia;
      });
      setEditando(false);

      Alert.alert('Sucesso', 'Curiosidade salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível salvar a curiosidade. Tente novamente.');
    }
  };

  const proximaCuriosidade = () => {
    setIndiceAtual((prev) => (prev + 1) % curiosidades.length);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Cérebro-Curioso.png')} style={styles.headerIcon} />
        <Image source={require('../assets/historia.png')} style={styles.headerIcon} />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.tipText}>Adicione uma curiosidade</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AdicionarCuriosidade')}
          >
            <Image source={require('../assets/Adicionar.png')} style={styles.plusIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          {editando ? (
            <>
              <TextInput
                style={[styles.cardText, styles.textInput]}
                value={textoEditado}
                onChangeText={setTextoEditado}
                multiline
              />
              <TouchableOpacity onPress={salvarEdicao}>
                <Text style={styles.salvarBtn}>OK</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={proximaCuriosidade}>
              <Text style={styles.cardText}>{curiosidades[indiceAtual]}</Text>
              <Text style={{ textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>
                (Toque no texto para ver próxima curiosidade)
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/Home.png')} style={styles.iconFooter} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setTextoEditado(curiosidades[indiceAtual]);
          setEditando(true);
        }}>
          <Image source={require('../assets/lapis.png')} style={styles.iconFooter} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Historia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dc713c', // laranja
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  headerIcon: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  tipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
  card: {
    backgroundColor: '#f8e0b2',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    minHeight: 100,
    justifyContent: 'center',
  },
  cardText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  salvarBtn: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  iconFooter: {
    width: 40,
    height: 40,
  },
});
