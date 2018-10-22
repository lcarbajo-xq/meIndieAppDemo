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
                <View style= { styles.eventBox }>
                    <View style= { styles.eventImageContainer }>
                        <Image style={ { width: 400, height: 200, zIndex: 990 } } source={ require ('../../assets/portada-default.jpg')}/>
                        <View style={ styles.eventInfoContainer }>
                            <Text style={ styles.eventTexts }> Titulo del Evento</Text>
                            <Text style={ styles.eventTexts }> Descripcion</Text>
                            <Text style={ styles.eventTexts }> Lugar </Text>
                        </View>
                    </View>
                    <View style= {styles.eventCreator }>
                        <Image style= { styles.eventCreatorImage } source={ require('../../assets/user-profile-default.jpg') }/>
                        <View>
                            <Text> Created by</Text>
                            <Text> { user }</Text>
                        </View>
                        <Text> Fecha del Evento </Text>
                    </View>
                    <View style={ styles.container2 }>
                        <ImageBackground style={styles.image} source={ require ('../../assets/portada-default.jpg')}>
                            <LinearGradient colors={['transparent', 'black']} style={styles.linearGradient}>
                            <Text style={styles.name}>Texto 1</Text>
                            <Text style={styles.name}>Texto 2</Text>
                            <Text style={styles.name}>Texto 3</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 12,
                                backgroundColor: 'transparent',
                                opacity: 0.75,
                            }}>Tap to view more</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                </View>
            
        )
    }
}

const styles = StyleSheet.create({
    eventBox: {
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
      },
      container2: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: 'blue',
        margin: '3%',
        height: 200,
        overflow: 'hidden',
      },
      name: {
        color: 'white',
        fontFamily: 'Avenir-Heavy',
        fontSize: 16,
        backgroundColor: 'transparent'
      },
      linearGradient: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      },
    eventImageContainer: {
        width: 400,
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    eventInfoContainer: {
        padding: 5, 
        bottom: 0, 
        marginVertical: 8, 
        marginHorizontal: 8,
        zIndex: 9990,
        backgroundColor: 'black',
        opacity: 0.7
    },
    eventTexts: {
        color: 'white',
        padding: 2,
        fontFamily: 'System',
        fontWeight: 'bold',
        marginBottom: 1,
        borderRadius: 10,
        marginHorizontal: 8,
        zIndex: 9999
    },
    eventCreator: {
        width: 400,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f2f6'
    },
    eventPlace: {
    },
    eventCreatorImage: {
        marginLeft: 5,
        width: 50, 
        height: 50,
        borderWidth: 5,
        borderRadius: 25
    }
  });