import React, { Component } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window")

export default class ToDo extends React.Component{
    state = {
        isEditing: false
    };

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.circle}>
                    </View>
                </TouchableOpacity>
                <Text style= {styles.text}>Hello I'm your To Do</Text>
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"


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
        borderColor: "red",
        borderWidth: 4,
        marginRight: 20
    }
});