import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './src/screens/home';
import Login from './src/screens/login';
import ArtistProfile from './src/screens/artist-profile';
import UserProfile from './src/screens/user-profile';

export default class App extends Component{

  render() {
    return (
      <Router>
        <Scene key="root">
        <Scene key="userProfile" 
                 component={ UserProfile } 
                 title="Test User"                  
                 navigationBarStyle={ styles.navBarProfile }
                 hideNavBar={ false } color='#aaa69d'/> 
          <Scene key="appLogin" component={ Login } hideNavBar/>
          <Scene key="home" component={ Home } hideNavBar/>
          <Scene key="artistProfile" 
                 component={ ArtistProfile } 
                 title="Comments" 
                 navigationBarStyle={ styles.navBar }
                 hideNavBar={ false } color='#aaa69d'/>
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa69d'
  },
  navBar: {
    backgroundColor: '#aaa69d'
  },
  navBarProfile: {
    backgroundColor: '#22a6b3'
  }
});
