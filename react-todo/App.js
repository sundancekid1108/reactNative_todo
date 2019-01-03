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
        newToDo: "",
        loadedToDos: false,
        toDos: {}
      };
   
    componentDidMount = () => {
        this._loadToDos()
      }; 


    render() {
        const {newToDo, loadedToDos, toDos} = this.state;
        if (!loadedToDos) {
            return <AppLoading />;
          }
       

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
                                underlineColorAndroid={"transparent"}
                            />
                            

                            <ScrollView contentContainerStyle= {styles.todos}>
                            {Object.values(toDos)
                                .reverse()    
                                .map(toDo => (<ToDo
                                    
                                    key={toDo.id}
                                    deleteToDo={this._deleteToDo}
                                    completeToDo={this._completeToDo}
                                    uncompleteToDo={this._uncompleteToDo}
                                    updateToDo={this._updateToDo}
                                    {...toDo}  />
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

    _loadToDos = async() => {
        try {
            const toDos = await AsyncStorage.getItem("toDos");
            const parsedToDos = JSON.parse(toDos);
            this.setState({ loadedToDos: true, toDos: parsedToDos || {} });
          } catch (err) {
            console.log(err);
          }
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
                }
                this._saveToDo(newState.toDos)
                return { ...newState }
            })
        }
    }

    _deleteToDo = (id) => {
        this.setState(prevState => {
            const toDos = prevState.toDos
            delete toDos[id]
            const newState = {
                ...prevState,
                ...toDos
            }
            this._saveToDo(newState.toDos)
            return {...newState}
        })
    }


    /*이전 prevSate값을 newState에 넣음, isCompleted를 false로 수정 
    */
    _uncompleteToDo = (id) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: false
                    }
                }
            }
        this._saveToDo(newState.toDos)    
        return {...newState}
        })
    }

    /*이전 prevSate값을 newState에 넣음, isCompleted를 true로 수정 */
    _completeToDo = (id) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: true
                    }
                }
            }
        this._saveToDo(newState.toDos)
        return {...newState}
        })
    } 


    /*이전값을 가져와서 덮어씀.., text에는 새로운 값을 넣음 */

    _updateToDo = (id, text) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: { ...prevState.toDos[id], text: text }
                }
            }
        this._saveToDo(newState.toDos)
        return {...newState}
        })
    }

    /*AsyncStorage를 통해 저장, AsyncStorage는 Object는 저장 못하고 string만 저장해서 바꿔줘야됨
    JSON.stringify로 바꿔줌 */

    _saveToDo = newToDos => {
        console.log(newToDos)
        const string_newToDos = JSON.stringify(newToDos)
        const saveToDos = AsyncStorage.setItem('toDos', string_newToDos);
        const t= AsyncStorage.getItem('toDos')
        console.log(t)
        //console.log(saveToDos)
       
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