import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Dimensions } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { TextInput } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get("window")

export default class App extends React.Component {
    render() {
        return ( <View style = { styles.container }>
            <StatusBar barStyle = "light-content" />
            <Text style={styles.title}>Nice ToDo</Text>
            <View style={styles.card}>
                <TextInput style={styles.input} placeholder={"New To Do"} />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F23657',
        alignItems: "center"
    },
    title: {
        color: '#FFF',
        fontSize: 40,
        marginTop: 50,
        fontWeight: "400",
        marginBottom: 30
 
    },
    card: {
        backgroundColor: "#FFF",
        flex: 1,
        width: width - 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius:10

    }
});