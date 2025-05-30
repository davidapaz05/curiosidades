import React, { useState, useEffect } from 'react'; 
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, TextInput, Alert
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';

const curiosidadesBase = [
  'O mel nunca estraga — já encontraram potes comestíveis com mais de 3.000 anos no Egito.',
  'As maçãs flutuam porque 25% do seu volume é ar.',
  'O ketchup era usado como remédio no século XIX.',
  'O chocolate já foi usado como moeda pelos maias e astecas.',
];

const CuriosidadeComida = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Estado que armazena todas curiosidades atuais (começa com as da base)
  const [curiosidades, setCuriosidades] = useState(curiosidadesBase);

  // Curiosidade mostrada no momento
  const [curiosidade, setCuriosidade] = useState(curiosidadesBase[0]);

  // Estados para edição
  const [editando, setEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(curiosidadesBase[0]);

  // Função para carregar curiosidades da API
  const carregarCuriosidades = async () => {
    try {
      const response = await api.get('/curiosidades/categoria/COMIDA');
      if (response.data && response.data.length > 0) {
        const curiosidadesAPI = response.data.map(item => item.texto);
        setCuriosidades(curiosidadesAPI);
        setCuriosidade(curiosidadesAPI[0]);
        setTextoEditado(curiosidadesAPI[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar curiosidades:', error);
      Alert.alert('Erro', 'Não foi possível carregar as curiosidades.');
    }
  };

  // Carrega as curiosidades quando o componente é montado
  useEffect(() => {
    carregarCuriosidades();
  }, []);

  // Função que mostra uma curiosidade aleatória diferente da atual
  const mostrarNovaCuriosidade = () => {
    if (curiosidades.length <= 1) return;

    let nova;
    do {
      nova = curiosidades[Math.floor(Math.random() * curiosidades.length)];
    } while (nova === curiosidade);

    setCuriosidade(nova);
    setTextoEditado(nova);
  };

  // Salvar edição atual
  const salvarEdicao = async () => {
    try {
      // Envia a curiosidade para a API
      await api.post('/curiosidades', {
        texto: textoEditado,
        categoria: 'COMIDA'
      });

      // Atualiza o estado local
      setCuriosidade(textoEditado);
      setCuriosidades((old) =>
        old.map((item) => (item === curiosidade ? textoEditado : item))
      );
      setEditando(false);

      Alert.alert('Sucesso', 'Curiosidade salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível salvar a curiosidade. Tente novamente.');
    }
  };

  // useFocusEffect para atualizar curiosidades quando voltar da tela de AdicionarCuriosidade
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.novaCuriosidade) {
        const nova = route.params.novaCuriosidade.trim();

        if (nova.length > 0 && !curiosidades.includes(nova)) {
          setCuriosidades((old) => [...old, nova]);
          setCuriosidade(nova);
          setTextoEditado(nova);
        }

        // Limpa o parâmetro para evitar repetição ao voltar
        navigation.setParams({ novaCuriosidade: undefined });
      }
    }, [route.params?.novaCuriosidade])
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Cérebro-Curioso.png')} style={styles.headerIcon} />
        <Image source={require('../assets/comida.png')} style={styles.headerIcon} />
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.tipText}>Adicione uma curiosidade</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AdicionarCuriosidade', { categoria: 'COMIDA' })}
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
            <TouchableOpacity onPress={mostrarNovaCuriosidade}>
              <Text style={styles.cardText}>{curiosidade}</Text>
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

        <TouchableOpacity onPress={() => setEditando(true)}>
          <Image source={require('../assets/lapis.png')} style={styles.iconFooter} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CuriosidadeComida;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#791d1d', // vermelho
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  headerIcon: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
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
    backgroundColor: '#f26a6a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    minHeight: 100,
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
