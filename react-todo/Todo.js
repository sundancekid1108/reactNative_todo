import React, { Component } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window")

export default class ToDo extends React.Component{
    state = {
        isEditing: false,
        isCompleted: false
    };

    render(){
        const {isCompleted} = this.state;
        const {isEditing} = this.state;


        return(
            <View style={styles.container}>
                <View style= {styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}>
                        </View>
                    </TouchableOpacity>
                    <Text style= {[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                        Hello I'm your To Do
                    </Text>
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
                            <TouchableOpacity>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        
                        </View>
                    }
                
            </View>
        );
        
    }

   _toggleComplete = () => {
       this.setState(prevState => {
           return{
               isCompleted: !prevState.isCompleted
           }
       })
   }

   _startEditing = () => {
       this.setState({
           isEditing: true
       })
   }

   _finishEditing = () => {
       this.setState({isEditing: false})
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
        width: width /2,
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 15,
        marginHorizontal: 15
    }
});