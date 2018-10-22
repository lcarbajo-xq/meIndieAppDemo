import { firebaseDB, firebaseStorage } from '../APIs/firebase-client'

export default class Helpers {
    static setUserName(userId, name) {
        console.log(userId + name )
        const userPath = "/users/"+userId+"/profile/userName"
        return firebaseDB.ref(userPath).set(name)
    }

    static setUserBio(  userId, bio ) {
        const bioPath = "/users/"+userId+"/profile/userBio"
        return firebaseDB.ref(bioPath).set(bio)
    }

    static setUserPlaceBirth( userId, placeBirth ) {
        const bioPath = "/users/"+userId+"/profile/placeBirth"
        return firebaseDB.ref(bioPath).set(placeBirth)
    }

    static setUsertImage( userId, userImage ){
        const userImagePath = "/users/"+userId+"/profile/userImageUri"
        return firebaseDB.ref(userImagePath).set(userImage)    
    }

    static setEventTitle( userId, eventTitle, eventDate ) {
        const userEventPath = "/users/"+userId+"/events/"+eventTitle+eventDate+"/eventTitle"
        return firebaseDB.ref(userEventPath).set(eventTitle)
    }

    static setEventDate( userId, eventDate, eventTitle ) {
        const userEventPath = "/users/"+userId+"/events/"+eventTitle+eventDate+"/eventDate"
        return firebaseDB.ref(userEventPath).set(eventDate)
    }

    static setEventDescription(  userId, eventDescription, eventTitle, eventDate ) {
        const eventDescriptionPath = "/users/"+userId+"/events/"+eventTitle+eventDate+"/eventDescription"
        return firebaseDB.ref(eventDescriptionPath).set(eventDescription)
    }
    static setEventPlace( userId, eventPlace, eventTitle, eventDate  ) {
        const userEventPath = "/users/"+userId+"/events/"+eventTitle+eventDate+"/eventPlace"
        return firebaseDB.ref(userEventPath).set(eventPlace)
    }

    static setEventImage( userId, eventImage, eventTitle, eventDate ){
        const eventImagePath = "/users/"+userId+"/events/"+eventTitle+eventDate+"/eventImageUri"
        return firebaseDB.ref(eventImagePath).set(eventImage)    
    }

    static getUserImage ( userId, setState ) {
        const userImagePath = firebaseDB.ref(`/users/${ userId}/profile/userImageUri`)
        firebaseDB.ref( userImagePath ).on('value', snapshot => {
            let userImage = ''
            if( snapshot.val() ) {
                userImage = snapshot.val()
            }
            setState ( userImage )
        })
    }

    static getUserName ( userId, setState ) {
        const userNamePath = firebaseDB.ref(`/users/${ userId}/profile/userName`)
        firebaseDB.ref( userNamePath ).on( 'value', snapshot => {
            let userName = ''
            if ( snapshot.val() ) {
                userName = snapshot.val()
            }
            setState ( userName )
        })
    }

    static getUserEvents ( userId, callback ) {
        const userNamePath = "/users/"+userId
        firebaseDB.ref(userNamePath).on( "value", snapshot => {
            const user = snapshot.val()
            if ( user ){
                if ( user.events ) {
                    const userEventsObj = {
                        name: user.profile.userName,
                        image: user.profile.userImageUri,
                        events: user.events
                    }
                    callback ( userEventsObj )
                }
            }

        })
    }

    static getAllEvents( callback ) {
        const userPath = "/users/"
        firebaseDB.ref(userPath).on( "value", snapshot => {
            const allUser = snapshot.val()
            const allEventsArray = []
            if (allUser ){
                for (let key in allUser ) {

                    let obj = allUser[ key ]
                    let name = allUser.user.profile.userName
                    let avatar = allUser.user.profile.userImageUri

                    for ( let prop in obj ) {
                        let events = obj[ prop ]

                        for ( let event in events ) {
                            if (events [ event ].eventTitle && events [ event ].eventDate && events [ event ].eventPlace 
                                && events [ event ].eventDescription && events [ event ].eventImageUri ) {
                                    allEventsArray.push ({
                                        userName: name,
                                        userAvatar: avatar,
                                        eventTitle: events [ event ].eventTitle,
                                        eventDate: events [ event ].eventDate,
                                        eventPlace: events [ event ].eventPlace,
                                        eventDescription: events[ event ].eventDescription,
                                        eventImageUri: events[ event ].eventImageUri
                                    })
                                }
                        }
                    }
                }
                callback ( allEventsArray )
            }
        })

    }
}