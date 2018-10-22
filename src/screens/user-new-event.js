import React, { Component } from 'react';
import {
        View,
        Text,
        StyleSheet,
        TextInput,
        Image,
        TouchableOpacity,
        Platform
            }  from 'react-native';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome'

import { firebaseStorage } from '../APIs/firebase-client';
import Helpers from '../Utils/fb-helpers';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
    return new Promise(( resolve, reject ) => {
            const uploadUri = Platform.OS === 'ios' ? 
                uri.replace('file://', '') :
                uri
            let uploadBlob = null
            const imageRef = firebaseStorage.ref('images/events').child(imageName)
            fs.readFile( uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64`} )
                })
                .then( blob => {
                    uploadBlob = blob
                    return imageRef.put( blob, { contenType: mime } )
                })
                .then( () =>  {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then( url => {
                    resolve(url)
                })
                .catch( error => {
                    reject( error )
                }) 
        })
}


export default class UserProfile extends Component {

   state = {
    imagePath: '',
    imageeHeigth: '',
    imageWidth: '',
    title: '',
    eventDescription: '',
    eventDate: '',
    eventPlace: '',
    uid: ''
   } 

   componentWillMount() {
       try {
        // console.log('Mi UID '+ firebaseAuth.currentUser.uid)
        // const { uid } = firebaseAuth.currentUser
        this.setState({
            uid: '9pMEvuJnFhZyB6q9VLtp3B2OlT93'

        })
       } catch (Error) {
        console.log(Error + 'Error Current User')
       }
   }

    saveForm = () => {
       if ( this.state.uid ){
            try {
                this.state.eventTitle ? Helpers.setEventTitle ( this.state.uid, this.state.eventTitle, this.state.eventDate) : 'Test Event eventTitle'
                this.state.eventDescription ? Helpers.setEventDescription ( this.state.uid, this.state.eventDescription, this.state.eventTitle, this.state.eventDate ) : 'No  Description'
                this.state.eventDate ? Helpers.setEventDate ( this.state.uid, this.state.eventDate ,this.state.eventTitle ) : 'When it will be'
                this.state.eventPlace ? Helpers.setEventPlace ( this.state.uid, this.state.eventPlace ,this.state.eventTitle, this.state.eventDate ) : 'Where is will take place'
                this.state.imagePath ?
                    uploadImage(this.state.imagePath, `${ this.state.uid }.jpg` )
                    .then( responseData => {
                        Helpers.setEventImage( this.state.uid, responseData, this.state.eventTitle, this.state.eventDate )
                    })
                    .done() :
                    null
            } catch (Error) {
                console.log(Error+ 'Error There is no User Name')
            }
       }
    }
    handleImagePicking = () => {
        const data = {
            title: '',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        ImagePicker.showImagePicker( data, ( response ) => {
            if ( response.didCancel ) {
                console.log('User has cancelled the image uploading!!')
            } else if (response.error) {
                console.log('Error:' + response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button' + response.customButton)
            } else {
                this.setState({
                    imagePath: response.uri,
                    imageeHeigth: response.height,
                    imageWidth: response.width
                })
            }
        })
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style= { styles.eventImageContainer }>
                    <View style={ styles.eventImageSeletor } >
                        { this.state.imagePath ? 
                            <Image style={ styles.eventImage } source= {{ uri: this.state.imagePath }} /> :
                            <View style={ styles.eventImageDefault }>
                                 <Icon name='image' size={ 200 } color='#ff7f50'/> 
                            </View>
                        }
                    </View>
                    <View style={ styles.editImageButtonContainer }>
                        <TouchableOpacity
                            style= { styles.editImageButton } 
                            onPress={ this.handleImagePicking }
                            >
                            <Icon name='camera' size={ 15 } color='white' style={{ }}/>
                            <Text style={ styles.editImageText }>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style= { styles.profileImageContainer }>
                    <Image source={ require ('../../assets/user-profile-default.jpg') } style={ styles.userImage } />
                </View>
                <View style= { styles.inputData} >
                    <TextInput
                        style={ [styles.input, styles.inputTitle] }
                        placeholder='Event title'
                        value={ this.state.eventTitle }
                        allowFontScaling
                        onChangeText={ ( eventTitle ) => this.setState({ eventTitle })}
                        />
                    <TextInput
                        style={ styles.input }
                        placeholder='Event date'
                        value={ this.state.eventDate }
                        allowFontScaling
                        onChangeText={ ( eventDate ) => this.setState({ eventDate })}
                        />
                    <TextInput
                        style={ styles.input }
                        placeholder='Event place'
                        value={ this.state.eventPlace }
                        onChangeText={ ( eventPlace ) => this.setState({ eventPlace })}
                        />
                    <TextInput
                        style={ [styles.input, { marginTop: 15 }] }
                        placeholder='Event description'
                        value={ this.state.eventDescription }
                        maxLength={ 140 }
                        multiline
                        numberOfLines= { 4 } 
                        onChangeText={ ( eventDescription ) => this.setState({ eventDescription })}
                        />
                    <TouchableOpacity
                        style= { styles.saveEventButton }
                        onPress={ this.saveForm }
                        >
                        <Icon style={ { padding: 5} }name='upload' size={ 25 } color= 'white' />
                        <Text style= { styles.saveEventButtonText }>Add event</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'space-around',
        backgroundColor: '#f1f2f6'
    },
    eventImageContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ced6e0'
    },
    eventImageSelector: { 
        flexDirection: 'row', 
        // justifyContent: 'flex-end' 
    },
    eventImage: {
        height: 200, 
        width: 400 
    },
    eventImageDefault: { 
        height: 200, 
        width: 400, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    editImageButtonContainer: { 
        padding: 8, 
        bottom: 0, 
        right: 8, 
        marginVertical: 8, 
        marginHorizontal: 8,
        flexDirection: 'row', 
        backgroundColor: '#ff7f50',
        position: 'absolute' 
    },
    editImageButton: { 
        flexDirection: 'row',
   },
    editImageText: { 
        marginLeft: 5, 
        fontFamily: 'System', 
        color: 'white' 
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 155,
        position: 'absolute'
    },
    coverUserImage: {
        width:  400,
        height: 200,
        marginTop: 0
    },
    userImage: {
        width:  100,
        height: 100,
        borderWidth: 5,
        borderColor: '#ff7f50',
        borderRadius: 50
    },
    inputData: {
        alignSelf: 'flex-start',
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: 10
    },
    inputTitle:{
        fontSize: 25,
        marginTop: 60
    },
    input: {
        padding: 5,
        backgroundColor: '#ffffff',
        fontSize: 20,
        fontFamily: 'System',
        width: 360,
        marginTop: 5,
        borderRadius: 5
    },
    saveEventButton: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#ff7f50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
    },
    saveEventButtonText: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        marginHorizontal: 15,
    }
})