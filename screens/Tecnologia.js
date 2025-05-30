import React, { useState, useCallback } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, TextInput, Alert
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';

const curiosidadesIniciais = [
  'O primeiro computador pesava mais de 27 toneladas e ocupava uma sala inteira!\nEra o ENIAC, criado em 1946.',
  'O primeiro mouse foi criado em 1964 e era feito de madeira.',
  'O conceito de inteligência artificial foi criado em 1956.',
];

const Tecnologia = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Estado para lista de curiosidades
  const [curiosidades, setCuriosidades] = useState(curiosidadesIniciais);
  // Estado para indice da curiosidade atualmente exibida
  const [indiceAtual, setIndiceAtual] = useState(0);
  // Estado para edição
  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(curiosidades[0]);

  // Função para carregar curiosidades da API
  const carregarCuriosidades = async () => {
    try {
      const response = await api.get('/curiosidades/categoria/TECNOLOGIA');
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

  // Atualiza a curiosidade exibida quando muda o índice ou curiosidades
  React.useEffect(() => {
    setTextoEditado(curiosidades[indiceAtual]);
  }, [indiceAtual, curiosidades]);

  // Pega a curiosidade nova que pode vir por parâmetro
  useFocusEffect(
    useCallback(() => {
      if (route.params?.novaCuriosidade) {
        const salvarNovaCuriosidade = async () => {
          try {
            await api.post('/curiosidades', {
              texto: route.params.novaCuriosidade,
              categoria: 'TECNOLOGIA'
            });
            
            await carregarCuriosidades();
          } catch (error) {
            console.error('Erro ao salvar nova curiosidade:', error);
            Alert.alert('Erro', 'Não foi possível salvar a nova curiosidade.');
          }
        };

        salvarNovaCuriosidade();
        navigation.setParams({ novaCuriosidade: undefined });
      }
    }, [route.params?.novaCuriosidade])
  );

  const salvarEdicao = async () => {
    try {
      // Envia a curiosidade para a API
      await api.post('/curiosidades', {
        texto: textoEditado,
        categoria: 'TECNOLOGIA'
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

  // Função para avançar para próxima curiosidade (se quiser)
  const proximaCuriosidade = () => {
    setIndiceAtual((prev) => (prev + 1) % curiosidades.length);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Cérebro-Curioso.png')} style={styles.headerIcon} />
        <Image source={require('../assets/tecnologia.png')} style={styles.headerIcon} />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.tipText}>Adicione uma curiosidade</Text>

          {/* Botão para ir para AdicionarCuriosidade */}
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

        {/* Ícone lápis para editar */}
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

export default Tecnologia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6b637',
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
    color: '#000',
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
    backgroundColor: '#ffe578',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    minHeight: 100,
    justifyContent: 'center',
  },
  cardText: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
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
    marginBottom: 10,
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
