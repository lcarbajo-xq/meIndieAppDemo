import React, { Component } from 'react';
import { View,  Text,StyleSheet,Image, StatusBar, Badge } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Searcher from '../Utils/searcher'
import { } from 'react-navigation';

export default class UserProfile extends Component {
    static NavigationOptions = {
        title: 'Test User',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
    },
    }
    
      componentDidMount() {
        this.focus = this.props.navigation.addListener('didFocus', () => {
          StatusBar.setBarStyle('light-content');
        })
      }

      componentWillUnmount() {
        this.focus.remove();
      }

    render() {

        const { navigation }  = this.props
        const userName = navigation.getParam('userName', 'Test User')

        return (
            <View style={ styles.container }>
                <View style={ styles.profileImages }>
                    <View style={{ flexDirection: 'row',  justifyContent: 'flex-end' }}>
                        <Image source={ require ('../../assets/portada-default.jpg') } style={ styles.coverUserImage } />
                        <View style={{ padding: 8, bottom: 0, right: 8, marginVertical: 8, flexDirection: 'row', backgroundColor: '#f1f2f6', position: 'absolute' }}>
                            <Icon name='camera' size={ 15 } color='black' style={{ }}/>
                            <Text style={{ marginLeft: 5, fontFamily: 'System' }}>Editar</Text>
                        </View>
                    </View>
                    
                    <View style={ styles.profileImageContainer }>
                        <View>
                            <Image source={ require ('../../assets/user-profile-default.jpg') } style={ styles.userImage } />
                            <View style={{ borderRadius: 14, padding: 6, backgroundColor: '#f1f2f6', bottom: 16, right: 16, position: 'absolute' }}>
                                <Icon name='camera' size={ 20 } style={{ }} color='black' />
                            </View>
                        </View>
                        <View style={ styles.profileData }>
                            <Text style={ styles.profileName }>{ userName }</Text>
                            <Text style={ styles.profileNickName }>(Nick Name)</Text>
                            <View style={ styles.profileBio }>
                                <Text style={ styles.profileBioData }>Añade tu biografía</Text>
                            </View>
                            <View style={ styles.iconViewTemplate }>
                                <View style= { styles.iconContainer }>
                                    <View style={ [ styles.iconBackground, { backgroundColor : '#2e86de'} ]}>
                                        <Icon name='plus-circle' size={ 32 } color='white' />
                                    </View>
                                    <Text style= {{ color: '#2e86de'}}>Añadir historia</Text>
                                </View >
                                <View style= { styles.iconContainer }>
                                    <View style={ styles.iconBackground }>
                                        <Icon name='account-edit' size={ 32 } />
                                    </View>
                                    <Text>Editar perfil</Text>
                                </View>
                                <View style= { styles.iconContainer }>
                                    <View style={ styles.iconBackground }>
                                        <Icon name='dots-horizontal-circle' size={ 32 } />
                                    </View>
                                    <Text>Más</Text>
                                </View>
                            </View>
                            <View style={ styles.profileInfo }>
                                <View style={ styles.profileUnit }>
                                    <Icon name='home-variant' size={ 25 } color='#b2bec3' />
                                    <Text>Vive en Gijón</Text>
                                </View>
                                <View style={ styles.profileUnit }>
                                    <Icon name='map-marker' size={ 25 } color='#b2bec3'/>
                                    <Text>De Sama de Langreo, Asturias,  Spain </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    profileImages: {
        flex: 1,
        // backgroundColor: 'yellow',
        alignItems: 'center'
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        position: 'absolute'
    },
    coverUserImage: {
        width:  400,
        height: 200,
        marginTop: 0
    },
    userImage: {
        width:  160,
        height: 160,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 80,
    },
    profileData: {
        flex: 1,
        // backgroundColor: 'orange'
    },
    profileName:{
        marginTop: 10,
        fontFamily: 'System', 
        fontSize: 25, 
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    profileNickName:{
        fontFamily: 'System', 
        fontSize: 20, 
        fontWeight: '300',
        alignSelf: 'center'
    },
    profileBio:{
        marginTop: 15, 
        justifyContent: 'flex-start', 
        alignItems:'center'
    },
    profileBioData: {
        color: '#54a0ff', 
        fontWeight: '600'
    },
    iconViewTemplate: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',   
    },
    iconContainer: {
        justifyContent: 'space-around',
        alignItems: 'center' 
    },
    iconBackground: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 35,
        marginBottom: 10,
    },
    profileInfo: {
        marginTop: 10,
        marginHorizontal: 10
    },
    profileUnit: {
        marginVertical: 2,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center'
    }
})