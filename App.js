import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Misterio from './screens/Misterio';
import Comida from './screens/Comida';
import Animal from './screens/Animal';
import Historia from './screens/Historia';
import Tecnologia from './screens/Tecnologia';

// 🆕 IMPORTAÇÕES NOVAS
import AdicionarCuriosidade from './screens/AdicionarCuriosidade';
import ListaCuriosidades from './screens/ListaCuriosidades'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Misterio" component={Misterio} />
        <Stack.Screen name="Comida" component={Comida} />
        <Stack.Screen name="Animal" component={Animal} />
        <Stack.Screen name="Historia" component={Historia} />
        <Stack.Screen name="Tecnologia" component={Tecnologia} />

        {/* 🆕 TELAS DE EDIÇÃO */}
        <Stack.Screen name="AdicionarCuriosidade" component={AdicionarCuriosidade} />
        <Stack.Screen name="ListaCuriosidades" component={ListaCuriosidades} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
