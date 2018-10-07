import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { firebaseDB, firebaseAuth } from '../APIs/firebase-client'

export default class ArtistBox extends Component {
    state = {
        liked: false,
        likeCount: 0
    }

    componentWillMount() {
        const { uid } = firebaseAuth.currentUser
        this.getArtistRef().on('value', snapshot => {
            const artist = snapshot.val()
            if (artist)
                this.setState({
                    likeCount: artist.likeCount,
                    liked: artist.likes && artist.likes[uid]
                })
        })
    }

    handlePress = () => {
        this.postLike(!this.state.liked)
    }

    getArtistRef = () => {
        const { id } = this.props.artist
        return firebaseDB.ref(`artst/${ id }`)
    }

    postLike = () => {
        const { uid } = firebaseAuth.currentUser
        this.getArtistRef().transaction( function(artist) {
            if (artist) {
              if (artist.likes && artist.likes[uid]) {
                artist.likeCount--;
                artist.likes[uid] = null;
              } else {
                artist.likeCount++;
                if (!artist.likes) {
                  artist.likes = {};
                }
                artist.likes[uid] = true;
              }
            }
            return artist || {
                likeCount: 1,
                likes: {
                    [uid] : true
                }
            }
        })
    }

    render(){
        const { image, name, likes, comments } = this.props.artist
        const likedIcon = this.state.liked ?
            <Icon name="thumb-up" size={ 25 } color='#e84118' /> :
            <Icon name="thumb-up-outline" size={ 25 } color='#596275' />

        return (
            <View style= { styles.artistBox }>
                <Image  source={{uri: image }}
                        style={ styles.artistImage } 
                        />
                <View  style={ styles.artistInfo }>
                    <Text style={ styles.artistName }>{ name }</Text>
                    <View style={ styles.social }>
                    <View style={ styles.socialInfo }>
                        <TouchableOpacity onPress={ this.handlePress }>
                            {likedIcon}
                        </TouchableOpacity>
                        <Text style={ styles.socialNum }>{ this.state.likeCount }</Text>
                    </View >
                    <View style={ styles.socialInfo }>
                        <Icon name="comment-multiple-outline" size={ 25 } color='#596275'/>
                        <Text style={ styles.socialNum }>{ comments }</Text>
                    </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    artistBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:  '#d2dae2',
      shadowColor:'black',
      marginVertical: 2,
      shadowOpacity: .9,
      shadowOffset: {
          height: 1,
          width: -2
      }
    },
    artistInfo: {
      flex:  1,
      alignItems: 'center'
    },
    artistName: {
      fontSize: 20
    },
    artistImage:  {
        height: 100, 
        width: 100
    },
    social: {
      flexDirection:  'row',
      marginTop: 20,
      marginHorizontal: 50,
    },
    socialInfo:  {
      flex: 1,
      alignItems: 'center',
    },
    socialNum:  {
      color: '#596275'
    }
  });