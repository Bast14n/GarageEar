import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export function SetGame({ navigation }: any) {
  const navigate = (numberOfRounds: number) => {
    navigation.navigate('Game', { numberOfRounds: numberOfRounds })
  }

  const [roundNumber, setRoundNumber] = useState('5');

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputDescription}>Podaj ilość rund</Text>
        <TextInput keyboardType='numeric' style={styles.input} value={roundNumber} onChangeText={(number) => setRoundNumber(number)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Graj' onPress={() => {
          navigate(parseInt(roundNumber))
        }} />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    padding: 24,
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    textAlign: 'center',
    height: '40%',
    width: '45%',
    fontSize: 25
  },
  inputDescription: {
    marginBottom: '5%',
    fontSize: 25
  }
});