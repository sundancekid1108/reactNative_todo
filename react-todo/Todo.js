import React, { Component } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window")

export default class ToDo extends React.Component{
    constructor(props){
        super(props)
        this.state = { isEditing: false, todoValue: props.text}
    } 

    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired
       
      };
    
    state = {
        isEditing: false,
        todoValue: ""
    };
   

    render(){
        const { isEditing, todoValue} = this.state;
        
        const { text, id, isCompleted, deleteToDo } = this.props;


        return(
            <View style={styles.container}>
                <View style= {styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}>
                        </View>
                    </TouchableOpacity>
                    {isEditing ? ( <TextInput style={[styles.text, styles.input, , isCompleted ? styles.completedText : styles.uncompletedText]} 
                        value={todoValue}
                        multiline={true}
                        onChangeText={this._controlInput}
                        onBlur={this._finishEditing}
                        underlineColorAndroid={"transparent"}/>) : 
                        (<Text style= {[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                        {text}
                    </Text>)}
                    
                    
                </View>
                    {isEditing ? 
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={(event) => {
                                event.stopPropagation    
                                deleteToDo(id)
                            }}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        
                        </View>
                    }
                
            </View>
        );
        
    }

   _toggleComplete = (event) => {
       event.stopPropagation()
       const {isCompleted, uncompleteToDo, completeToDo, id} = this.props
       if(isCompleted) {
           uncompleteToDo(id)
       }
       else{
           completeToDo(id)
       }
   }

   _startEditing = (event) => {
        event.stopPropagation()
       
       this.setState({
           isEditing: true,
           

       })
   }

   _finishEditing = (event) => {
        event.stopPropagation()
       const {todoValue} = this.state
       const {id, updateToDo} = this.props
       updateToDo(id, todoValue)
       this.setState({isEditing: false})
   }

   _controlInput = (text) => {
       this.setState({
           todoValue: text
       })
   }

}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"


    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        
        borderWidth: 4,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23567"
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "black"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width /2
        
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 15,
        marginHorizontal: 15
    },
    input: {
        marginVertical: 15,
        width: width /2,
        paddingBottom: 5
    }
});