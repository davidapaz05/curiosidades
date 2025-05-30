import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';

const categorias = [
  { nome: 'MISTERIO', cor: '#f39c12', icone: require('../assets/misterio.png') },
  { nome: 'ANIMAIS', cor: '#27ae60', icone: require('../assets/animais.png') },
  { nome: 'HISTORIA', cor: '#d35400', icone: require('../assets/historia.png') },
  { nome: 'TECNOLOGIA', cor: '#9b59b6', icone: require('../assets/tecnologia.png') },
  { nome: 'COMIDA', cor: '#e74c3c', icone: require('../assets/comida.png') },
];

const NovaCuriosidade = () => {
  const navigation = useNavigation();
  const [textoCuriosidade, setTextoCuriosidade] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null); // <- alterado para null

  const salvarCuriosidade = async () => {
    if (!textoCuriosidade.trim() || !categoriaSelecionada) {
      Alert.alert('Erro', 'Preencha a curiosidade e selecione uma categoria!');
      return;
    }

    const curiosidade = {
      texto: textoCuriosidade.trim(),
      categoria: categoriaSelecionada?.nome || '',
    };

    console.log('Enviando curiosidade:', {
      texto: curiosidade.texto,
      categoria: curiosidade.categoria,
      categoriaTipo: typeof curiosidade.categoria
    });

    try {
      const response = await api.post('/curiosidades', curiosidade);
      console.log('Resposta da API:', response.data);

      Alert.alert('Sucesso', 'Curiosidade salva com sucesso!');
      setTextoCuriosidade('');
      setCategoriaSelecionada(null);
      navigation.navigate('ListaCuriosidades');
    } catch (error) {
      console.error('Erro ao salvar curiosidade:', error?.response?.data || error?.message || 'Erro desconhecido');
      Alert.alert('Erro', 'Erro ao salvar curiosidade. Verifique os dados e tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nova Curiosidade</Text>
        <Image source={require('../assets/Cérebro-Curioso.png')} style={styles.headerIcon} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Digite sua curiosidade:</Text>
        <TextInput
          style={styles.input}
          value={textoCuriosidade}
          onChangeText={setTextoCuriosidade}
          placeholder="Ex: O polvo tem três corações"
          multiline
        />

        <Text style={styles.label}>Escolha a categoria:</Text>
        <View style={styles.categoriasContainer}>
          <View style={styles.colunaCategorias}>
            {categorias.slice(0, 3).map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoriaBotao,
                  {
                    backgroundColor: cat.cor,
                    borderColor: '#000',
                    borderWidth: categoriaSelecionada?.nome === cat.nome ? 2 : 0,
                  },
                ]}
                onPress={() => setCategoriaSelecionada(cat)}
              >
                <Image source={cat.icone} style={styles.categoriaIcone} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.colunaCategorias}>
            {categorias.slice(3).map((cat, index) => (
              <TouchableOpacity
                key={index + 3}
                style={[
                  styles.categoriaBotao,
                  {
                    backgroundColor: cat.cor,
                    borderColor: '#000',
                    borderWidth: categoriaSelecionada?.nome === cat.nome ? 2 : 0,
                  },
                ]}
                onPress={() => setCategoriaSelecionada(cat)}
              >
                <Image source={cat.icone} style={styles.categoriaIcone} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCuriosidade}>
          <Text style={styles.botaoSalvarTexto}>Salvar Curiosidade</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/Home.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ListaCuriosidades')}>
          <Image source={require('../assets/lista.png')} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NovaCuriosidade')}>
          <Image source={require('../assets/lapis.png')} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NovaCuriosidade;

// Estilos (sem alterações)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfc98e',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  categoriasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colunaCategorias: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriaBotao: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  categoriaIcone: {
    width: 40,
    height: 40,
  },
  botaoSalvar: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  botaoSalvarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  footerIcon: {
    width: 35,
    height: 35,
  },
});
