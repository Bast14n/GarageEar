import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export type GameProps = {
    numberOfRounds: number
}

const data = ['Kuba Rarytas', 'Beata Belzebub', 'Wielki Kozioł', 'Kunta Kinte', 'Josef Bratan'];
let currentGameData = [...data];
let currentPerson: string;
let guessedPersonsCount = 0;


export function Game(props: GameProps) {
    const navigate = () => {
        props.navigation.navigate('Home');

    }


    const [currentRoundNumber, updateCurrentRoundNumber] = useState(1);
    console.log(`Guessed persons number: ${guessedPersonsCount}`)

    GetRandomPerson(currentGameData);
    if (props.numberOfRounds >= currentRoundNumber) {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>RUNDA: {currentRoundNumber}</Text>
                </View>
                <View style={styles.personContainer}>
                    <Text style={styles.person}>{currentPerson}</Text>
                </View>
                <View style={styles.gameButtonContainer}>
                    <Button title='Zgadłeś' color='green' onPress={() => {
                        updateCurrentRoundNumber(currentRoundNumber + 1)
                        guessedPersonsCount++;
                    }} />
                    <Button title='Nie Zgadłeś' color='red' onPress={() => {
                        updateCurrentRoundNumber(currentRoundNumber + 1)
                    }} />
                </View>
            </View>
        )
    }
    else {
        currentGameData = [...data];
        return (<View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Koniec gry zgadłeś: {guessedPersonsCount}</Text>
                <Button title='Wróć do Home' onPress={() => {
                    guessedPersonsCount = 0;
                    navigate();
                }} />
            </View>
        </View>)
    }
}

const GetRandomPerson = (tableWithNames: string[]) => {
    currentPerson = tableWithNames[Math.floor(Math.random() * tableWithNames.length)];
    let index = tableWithNames.indexOf(currentPerson);
    if (index !== -1) {
        tableWithNames.splice(index, 1);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    personContainer: {
        flex: 2,
        alignItems: 'center',
    },
    gameButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10%'
    },
    person: {
        fontSize: 35
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: '40%',
        justifyContent: 'flex-start'
    },
});