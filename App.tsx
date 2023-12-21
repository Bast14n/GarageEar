import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SetGame } from './views/SetGame';
import { Game } from './views/Game';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SetGame" component={SetGame} />
      <Stack.Screen name="Game">
        {props => (<Game numberOfRounds={props.route.params.numberOfRounds} data={props.route.params.data} {...props} />)}
      </Stack.Screen>
    </Stack.Navigator>
  );
}



const HomeScreen = ({ navigation }: any) => {
  const navigate = () => {
    navigation.navigate('SetGame')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Garage Ear</Text>
      <Button title='Zagraj' onPress={navigate} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: '40%',
    justifyContent: 'flex-start'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {

  }
});
