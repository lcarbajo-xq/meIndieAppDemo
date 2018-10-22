import React, { Component } from 'react';
import {
        View,
        Text,
        StyleSheet,
        TextInput,
        Image,
        TouchableOpacity,
        Platform }  from 'react-native';

import Helpers from '../Utils/fb-helpers';

export default class ShowImage extends Component {
    state = {
        userImage: '',
        userName: ''
    }
    async componentWillMount() {
        try {
            const userId = '9pMEvuJnFhZyB6q9VLtp3B2OlT93'
            await Helpers.getUserImage ( userId, imageURL => { 
                this.setState({
                    userImage: imageURL
                })}
            )
            await Helpers.getUserName ( userId, userNameReturned => { 
                this.setState({
                    userName: userNameReturned
                })}
            )
        } catch (Error) {
            console.log(Error)
        }
    }

    render() {
        return (
            <View>
                {
                    this.state.userImage ? 
                    <Image source={ { uri: this.state.userImage } } style={ { width: 100, height: 100} }  /> :
                    <Text> No hay imagen </Text>
                }
                {
                    this.state.userName ?
                        <Text> { this.state.userName } </Text> :
                        <Text> No hay nombre </Text>
                }
            </View>
        )
    }
}
