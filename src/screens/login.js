import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { LoginButton, AccessToken } from 'react-native-fbsdk'

import firebase, { firebaseAuth } from "../APIs/firebase-client";

const { FacebookAuthProvider } = firebase.auth

export default class Login extends Component{

  state = {
    userCredentials: null
  }

  componentWillMount(){
    this.authenticateUser();
  }

  componentDidUpdate(){
    Actions.userProfile();
  }

  authenticateUser = () => {

    AccessToken.getCurrentAccessToken().then( (data) => {

      const { accessToken } = data
      const credential = FacebookAuthProvider.credential(accessToken);
      firebaseAuth.signInAndRetrieveDataWithCredential(credential).then( (userCredentials) => {
        this.setState({
          userCredentials: userCredentials.user
        })
      }).catch( (error) => {
        console.log("Sign In Error", error);
      });
    })
  }
  handleLoginFinished = (error, result) => {
      if (error) {
        console.log("login has error: " + result.error);
      } else if (result.isCancelled) {
        console.log("login is cancelled.");
      } else {
        this.authenticateUser()
        Actions.userProfile();
      }
  }
  handleLogOut = () => {
    this.setState({
      userCredentials: null
    })
  }
  render() {

    return (
        <ImageBackground source={ require ('../../assets/login-background.jpg')} style={ styles.container }>
          <Image source={ require ('../../assets/app-logo.png')} style={ styles.logo }/>
          <Text style= { styles.welcome }>{`Wekcome`}</Text>
          <Text style={ styles.credentials }>{ this.state.userCredentials && this.state.userCredentials.displayName }</Text>
          <LoginButton 
            style={ styles.button }
            readPermissions={['public_profile', 'email']}
            onLoginFinished={ this.handleLoginFinished }
            onLogoutFinished={ this.handleLogOut }/>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null
  },
  logo: {
    marginVertical: 70,
    width: 180,
    height: 65
  },
  welcome: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'System',
    backgroundColor:  '#535c68'
  },
  credentials:  {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#535c68',
    marginTop: 15
  },
  button:  {
    width: 100,
    height: 40
  }
});