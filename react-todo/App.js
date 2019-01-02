import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
  AsyncStorage
} from "react-native";
import { AppLoading } from "expo";
import ToDo from "./Todo";
import uuidv1 from "uuid/v1";


const { height, width } = Dimensions.get("window")

export default class App extends React.Component {
    

    state = {
        newToDo: '',
        loadedToDos: false,
        toDos: {}
      };
  

    render() {
        const {newToDo, loadedTodos, toDos} = this.state;
           
        console.log(toDos)

        return ( 
            <View style = { styles.container }>
                <StatusBar barStyle = "light-content" / >
                    <Text style = { styles.title } > Nice ToDo </Text>
                        <View style = { styles.card } >
                            <TextInput 
                                style = { styles.input } 
                                placeholder = { "New To Do" } 
                                value = {newToDo}
                                onChangeText= {this._controlNewToDo}      
                                placeholderTextColor= {"#999"}
                                returnKeyType={"done"}
                                autoCorrect={false}
                                onSubmitEditing= {this._addToDo}
                            />
                            

                            <ScrollView contentContainerStyle= {styles.todos}>
                            {Object.values(toDos)
                                
                                .map(toDo => (<ToDo key={toDo.id} {...toDo}  />
                                ))}
                            </ScrollView>
                        </View>
            </View>
        );
        
    }
    _controlNewToDo = text => {
        
        this.setState({
            newToDo: text
        });
       
      };

    _loadToDos = () => {
        this.setState({
            loadedTodos: true
        })
    }
    _addToDo = () => {
        
        const { newToDo } = this.state;
        if (newToDo !== '') {
            this.setState(prevState => {
                const ID = uuidv1();
                const newToDoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newToDo,
                        createdAt: Date.now()
                    } 
                };
                const newState = {
                    ...prevState,
                    toDos: {
                        ...prevState.toDos,
                        ...newToDoObject
                    },
                    newToDo: ''
                };
                return { ...newState }
            })
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
    },
    todos: {
        alignItems: "center"
    }
});