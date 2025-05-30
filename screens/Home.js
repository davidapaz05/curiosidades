import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/ola-curioso.png')} 
          style={styles.brainImage} 
          resizeMode="contain"
        />
      </View>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>Escolha um tema:</Text>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#ffffff' }]}
            onPress={() => navigation.navigate('Misterio')}
          >
            <Image source={require('../assets/misterio.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#ffffff' }]}
            onPress={() => navigation.navigate('Comida')}
          >
            <Image source={require('../assets/comida.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#ffffff' }]}
            onPress={() => navigation.navigate('Animal')}
          >
            <Image source={require('../assets/animais.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#ffffff' }]}
            onPress={() => navigation.navigate('Historia')}
          >
            <Image source={require('../assets/historia.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#ffffff' }]}
            onPress={() => navigation.navigate('Tecnologia')}
          >
            <Image source={require('../assets/tecnologia.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7c871',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brainImage: {
    width: 250, // Aumentado
    height: 250, // Aumentado
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003366',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 25,
    color: '#fff',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  button: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
});
