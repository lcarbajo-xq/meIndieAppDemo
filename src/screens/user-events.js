import React, { Component } from 'react';
import { ListView, StyleSheet, TouchableOpacity } from 'react-native';

import Helpers from '../Utils/fb-helpers';

import EventBox from '../events/event-box';

export default class UserEventsList extends Component{

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            uid: '9pMEvuJnFhZyB6q9VLtp3B2OlT93',
            userName: '',
            userImageUri: '',
            eventTitle: '',
            eventDescription: '',
            eventDate: '',
            eventPlace: '',
            eventImageUri: ''
        }
    }

    componentWillMount() {
        Helpers.getUserEvents ( this.state.uid, ( events ) => {
            if ( events ) {
                this.setState({
                    userName: events.name ,
                    userImageUri: events.image,
                    events: events.events,
                    dataSource: this.state.dataSource.cloneWithRows( events.events )
                })
            }
        })
    }

    componentDidMount () {
        // this.updateDataSource(this.props.artist);
    }

    componentWillReceiveProps(newProps) {
        // if ( newProps.artist !== this.props.artist ) {
        // this.updateDataSource(newProps.artist)
        // }
    }

    // updateDataSource = update => {
    //     this.setState({
    //         dataSource: this.state.dataSource.cloneWithRows(update),
    //     });
    // }

    handlePress(artist) {
    }

    render() {

        return (
            <ListView contentContainer={ styles.contentContainer }
            enableEmptySections={true}
            dataSource={ this.state.dataSource }
            renderRow={ (  event  ) => 
                <TouchableOpacity onPress={ () => this.handlePress( event ) }>
                    <EventBox 
                        event={ event } 
                        user={ this.state.userName } 
                        userImage={ this.state.userImageUri } />
                </TouchableOpacity>}>
            </ListView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 30,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    }
})