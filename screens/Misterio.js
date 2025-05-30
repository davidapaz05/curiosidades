import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, TextInput, Alert
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';

const listaInicial = [
  'O Triângulo das Bermudas é famoso por desaparecimentos misteriosos.',
  'Até hoje, ninguém sabe como as Linhas de Nazca foram desenhadas.',
  'Há relatos de sons misteriosos vindo do fundo dos oceanos, chamados de "The Bloop".',
  'Os enormes Moais (estátuas de pedra) foram construídos por povos antigos, mas até hoje não se sabe como foram transportadas por quilômetros sem rodas ou animais.'
];

const Misterio = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [curiosidades, setCuriosidades] = useState([...listaInicial]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(curiosidades[0]);

  const carregarCuriosidades = async () => {
    try {
      const response = await api.get('/curiosidades/categoria/MISTERIO');
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

  useEffect(() => {
    carregarCuriosidades();
  }, []);

  useEffect(() => {
    setTextoEditado(curiosidades[indiceAtual]);
  }, [indiceAtual, curiosidades]);

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.novaCuriosidade) {
        const novaCuriosidade = route.params.novaCuriosidade;

        if (typeof novaCuriosidade === 'string' && novaCuriosidade.trim() !== '') {
          const salvarNovaCuriosidade = async () => {
            try {
              await api.post('/curiosidades', {
                texto: novaCuriosidade,
                categoria: 'MISTERIO'
              });
              await carregarCuriosidades();
            } catch (error) {
              console.error('Erro ao salvar nova curiosidade:', error);
              Alert.alert('Erro', 'Não foi possível salvar a nova curiosidade.');
            }
          };

          salvarNovaCuriosidade();
        }

        navigation.setParams({ novaCuriosidade: undefined });
      }
    }, [route?.params?.novaCuriosidade])
  );

  const proximaCuriosidade = () => {
    setIndiceAtual((prev) => (prev + 1) % curiosidades.length);
  };

  const salvarEdicao = async () => {
    try {
      await api.post('/curiosidades', {
        texto: textoEditado,
        categoria: 'MISTERIO'
      });

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

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Image source={require('../assets/Cérebro-Curioso.png')} style={styles.headerIcon} />
        <Image source={require('../assets/misterio.png')} style={styles.headerIcon} />
      </View>

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
              <Text style={{ textAlign: 'center', marginTop: 10, fontStyle: 'italic', color: '#fff' }}>
                (Toque no texto para ver próxima curiosidade)
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

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

export default Misterio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#58b4e9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  headerIcon: {
    width: 100,
    height: 100,
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
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#4026d3',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    minHeight: 100,
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
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
    color: '#fff',
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
