import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';

import ArtistList from '../artists/artist-list';
import API from '../APIs/api-lastfm'

export default class Home extends Component{
  state = {
    artists: null
  }
  async componentDidMount(){
    this.setState({
      artists: await API.getTopArtists()
    })
  }

  render() {

    return (
      <SafeAreaView style={ styles.container }>
        {
          !this.state.artists ?
          <ActivityIndicator size="large" /> :
          <ArtistList artist={ this.state.artists } />
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa69d'
  }
});