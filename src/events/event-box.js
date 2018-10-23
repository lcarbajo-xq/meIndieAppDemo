import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { firebaseDB, firebaseAuth } from '../APIs/firebase-client'

import LinearGradient from 'react-native-linear-gradient'

export default class ArtistBox extends Component {
    state = {
        liked: false,
        likeCount: 0,
        commentCount: 0
    }

    componentWillMount() {
               
    }

    handlePress = () => {
    
    }

    render(){
        // const { image, name } = this.props.artist
        // const likedIcon = this.state.liked ?
        //     <Icon name="thumb-up" size={ 25 } color='#e84118' /> :
        //     <Icon name="thumb-up-outline" size={ 25 } color='#596275' />
        const { eventTitle, eventDescription, eventDate, eventPlace, eventImageUri } = this.props.event
        const { user, userImage } = this.props
        return (
            <View style={ styles.eventBox }>
                <ImageBackground style={ styles.eventImage } source={ eventImageUri && { uri: eventImageUri}}>
                    <LinearGradient colors={['transparent', 'black']} style={styles.linearGradient}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={ styles.eventDate }>
                                <Text style={{ color: 'white', fontSize: 21 }}>18</Text>
                                <Text style={{ color: 'orange', fontSiez: 14 }}>NOV</Text>
                            </View>
                            <View style={ styles.eventInfo }>
                                <Text style={ styles.eventTitle }>{eventTitle ? eventTitle : 'Event Tittle'}</Text>
                                <Text style={ styles.eventTitle }>{ eventDescription ? eventDescription : 'Event Type'}</Text>
                            </View>
                        </View>
                        <Text style={{
                                color: 'white',
                                fontSize: 12,
                                backgroundColor: 'transparent',
                                opacity: 0.90,
                                padding: 5
                            }}>{ eventPlace ? eventPlace : 'Location' }</Text>
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    eventImage: {
        flex: 1,
        resizeMode: 'cover',
      },
      eventBox: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: 'blue',
        margin: '3%',
        height: 200,
        overflow: 'hidden',
      },
      eventInfo: {
          justifyContent: 'center',
          alignItems: 'flex-start',
      },
      eventTitle: {
        color: 'white',
        fontFamily: 'Avenir-Heavy',
        fontSize: 16,
        backgroundColor: 'transparent'
      },
      linearGradient: {
        flex: 1,
        padding: 14,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      },
      eventDate: {
          alignItems: 'flex-end',
          color: 'white',
          marginHorizontal: '2%',
      }
  });

  function formatDate (date) {
    var monthNames = [
      "JAN", "FEB", "MAR",
      "APR", "MAY", "JUN", "JUL",
      "AUG", "SEP", "OCT",
      "NOV", "DEC"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return monthNames[monthIndex];
  }