import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function ArtistCommentList (props) {
    return (
        <View style={ styles.container }>
            {
                props.userAvatar ? 
                <Image source={{uri: props.userAvatar }} style={ styles.userAvatar }/>
                :
                <Image source={{uri: 'https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'}} 
                       style={ styles.userAvatar }/>
            }
            <Text style={ styles.comment } >{ props.comment }</Text>
        </View>
    )
  }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#d2dae2',
        margin: 5,
        padding: 15,
    },
    userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16
    },
    comment: {
        marginLeft: 5,
        fontSize: 18
    }
})