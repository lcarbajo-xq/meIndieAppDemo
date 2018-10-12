import React, { Component } from 'react';
import { View,  Text,StyleSheet,Image } from 'react-native';

export default class UserProfile extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <View style= { styles.profileImages }>
                    <Image source={ require ('../../assets/portada-default.jpg') } style={ styles.coverUserImage } />
                    <View style={ styles.profileImageContainer }>
                        <Image source={ require ('../../assets/user-profile-default.jpg') } style={ styles.userImage } />
                    </View>
                </View>
                <View style={ styles.profileData }>
                        <Text style={ styles.profileName }>Louie Louie Rama Lamadindon</Text>
                        <Text style={ styles.profileNickName }>(TinTin)</Text>
                        <View style={ styles.profileBio }>
                            <Text style={ styles.profileBioData }>Añade tu biografía</Text>
                        </View>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    profileImages: { 
        flex: 1 
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    coverUserImage: {
        width:  400,
        height: 200,
    },
    userImage: {
        width:  160,
        height: 160,
        borderRadius: 80,
        position: 'absolute'
    },
    profileData: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems:'center'
    },
    profileName:{
        fontFamily: 'System', 
        fontSize: 25, 
        fontWeight: 'bold' 
    },
    profileNickName:{
        fontFamily: 'System', 
        fontSize: 20, 
        fontWeight: '300' 
    },
    profileBio:{
        marginTop: 15, 
        justifyContent: 'flex-start', 
        alignItems:'center'
    },
    profileBioData: {
        color: '#54a0ff', 
        fontWeight: '600'
    }
})