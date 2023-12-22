import { useState } from 'react';
import { SHEET_ID, API_KEY } from '@env';

import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

export type SetGameProps = {
  categories: string[]
}

export function SetGame(props: SetGameProps) {
  const navigate = (numberOfRounds: number) => {
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${category}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`).then(response => {
      const data = response.data.values.flat().slice(1)
      props.navigation.navigate('Game', { numberOfRounds: numberOfRounds, data: data })
    })

  }

  const categories = props.categories;
  const [category, setCategory] = useState(categories)
  const data: { title: string, value: string }[] = [];
  categories.forEach(category => {
    data.push({ title: category, value: category })
  })

  const [roundNumber, setRoundNumber] = useState('5');



  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputDescription}>Podaj ilość rund</Text>
        <TextInput keyboardType='numeric' style={styles.input} value={roundNumber} onChangeText={(number) => setRoundNumber(number)} />
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle} data={data} onChange={item => { setCategory(item.title) }} labelField="title" valueField="value" placeholder='Wybierz kategorie' value={category} />
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
  dropdownContainer: {
    flex: 1,
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
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});