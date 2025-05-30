import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image, TextInput, Alert
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';

const categorias = [
  { nome: 'MISTERIO', cor: '#f39c12', icone: require('../assets/misterio.png') },
  { nome: 'ANIMAIS', cor: '#27ae60', icone: require('../assets/animais.png') },
  { nome: 'HISTORIA', cor: '#d35400', icone: require('../assets/historia.png') },
  { nome: 'TECNOLOGIA', cor: '#9b59b6', icone: require('../assets/tecnologia.png') },
  { nome: 'COMIDA', cor: '#e74c3c', icone: require('../assets/comida.png') },
];

const ListaCuriosidades = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [curiosidades, setCuriosidades] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  const carregarCuriosidades = async () => {
    try {
      const response = await api.get('/curiosidades');
      if (response.data) {
        console.log('Dados da API:', response.data.map(item => ({
          texto: item.texto,
          categoria: item.categoria,
          tipo: typeof item.categoria
        })));
        setCuriosidades(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar curiosidades:', error);
      Alert.alert('Erro', 'Não foi possível carregar as curiosidades.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarCuriosidades();
    }, [])
  );

  const excluirCuriosidade = async (id) => {
    try {
      console.log('Tentando excluir curiosidade com ID:', id);
      await api.delete(`/curiosidades/${id}`);
      Alert.alert('Sucesso', 'Curiosidade excluída com sucesso!');
      carregarCuriosidades();
    } catch (error) {
      console.error('Erro ao excluir curiosidade:', error);
      Alert.alert('Erro', 'Não foi possível excluir a curiosidade.');
    }
  };

  const confirmarExclusao = (item) => {
    console.log('Item a ser excluído:', item);
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta curiosidade?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => excluirCuriosidade(item.id),
          style: 'destructive'
        }
      ]
    );
  };

  const curiosidadesFiltradas = curiosidades.filter(item => {
    const texto = item.texto ?? '';
    const correspondeTexto = texto.toLowerCase().includes(pesquisa.toLowerCase());
    
    // Se não houver filtro de categoria, mostra todos
    if (!filtroCategoria) {
      return correspondeTexto;
    }
    
    // Garantir que ambas as categorias sejam strings e estejam em maiúsculas
    const categoriaItem = String(item.categoria).toUpperCase().trim();
    const categoriaFiltro = String(filtroCategoria).toUpperCase().trim();
    
    // Log detalhado para debug
    console.log('Comparando categorias:', {
      itemCategoria: categoriaItem,
      filtroCategoria: categoriaFiltro,
      igual: categoriaItem === categoriaFiltro,
      item: item
    });
    
    // Se não corresponder à categoria, não mostra
    if (categoriaItem !== categoriaFiltro) {
      return false;
    }
    
    return correspondeTexto;
  });

  // Log para debug
  console.log('Filtro atual:', filtroCategoria);
  console.log('Todas as curiosidades:', curiosidades.map(item => ({
    texto: item.texto,
    categoria: item.categoria
  })));
  console.log('Curiosidades filtradas:', curiosidadesFiltradas.map(item => ({
    texto: item.texto,
    categoria: item.categoria
  })));

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemContent}>
        <Text style={styles.itemCategoria}>{item.categoria}</Text>
        <Text style={styles.itemTexto}>{item.texto}</Text>
      </View>
      <TouchableOpacity 
        style={styles.excluirButton}
        onPress={() => {
          console.log('Clicou para excluir item:', item);
          confirmarExclusao(item);
        }}
      >
        <Text style={styles.excluirButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Lista de Curiosidades</Text>
      </View>

      <View style={styles.pesquisaContainer}>
        <TextInput
          style={styles.inputPesquisa}
          placeholder="Pesquisar curiosidade..."
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      </View>

      <View style={styles.categoriasContainer}>
        {categorias.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoriaBotao,
              { backgroundColor: filtroCategoria === cat.nome ? cat.cor : '#fff' }
            ]}
            onPress={() => {
              if (filtroCategoria === cat.nome) {
                setFiltroCategoria(null);
              } else {
                setFiltroCategoria(cat.nome);
              }
            }}
          >
            <Image source={cat.icone} style={styles.categoriaIcone} />
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={curiosidadesFiltradas}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.vazioTexto}>Nenhuma curiosidade encontrada.</Text>}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/Home.png')} style={styles.iconFooter} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AdicionarCuriosidade')}>
          <Image source={require('../assets/Adicionar.png')} style={styles.iconFooter} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default ListaCuriosidades;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7d488',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pesquisaContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputPesquisa: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoriasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  categoriaBotao: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
  categoriaIcone: {
    width: 30,
    height: 30,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  itemCategoria: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  itemTexto: {
    fontSize: 16,
    color: '#000',
  },
  vazioTexto: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
    fontSize: 16,
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
  excluirButton: {
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  excluirButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
