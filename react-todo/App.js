import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Dimensions } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import ToDo from "./Todo"

const { height, width } = Dimensions.get("window")

export default class App extends React.Component {
    state= {
        newToDo: ""
    };

  

    render() {
        const { newToDo } = this.state.newToDo;
        return ( 
            <View style = { styles.container }>
                <StatusBar barStyle = "light-content" / >
                    <Text style = { styles.title } > Nice ToDo </Text>
                        <View style = { styles.card } >
                            <TextInput 
                                style = { styles.input } 
                                placeholder = { "New To Do" } 
                                value = {newToDo}
                                oneChangeText= {this._controlNewToDo}                        placeholderTextColor= {"#999"}
                                returnKeyType={"done"}
                                autoCorrect={false} >
                            </TextInput>

                            <ScrollView>
                                <ToDo />
                            </ScrollView>
                        </View>
            </View>
        );

        _controlNewToDo = text => {
            this.setState({
              newToDo: text
            });
          };
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
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                  height: -1,
                  width: 0
                }
              },
              android: {
                elevation: 3
              }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25
    }
});