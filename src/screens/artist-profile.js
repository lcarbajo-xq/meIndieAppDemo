import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ArtistBox from '../artists/artist-box';
import ArtistCommentList from '../artists/artist-comment-list'

import { firebaseDB, firebaseAuth} from '../APIs/firebase-client'

export default class ArtistProfile extends Component{
  state = {
    comments: [],
    changedText: false,
    commentCount: 0
  }

  componentDidMount() {
    this.getArtistCommentsRef().on('child_added', this.addComment)
  }


  componentWillUnmount() {
    this.getArtistCommentsRef().off('child_added', this.addComment)

  }

  addComment = (data) => {
    const comment = data.val()
      this.setState({
        comments: this.state.comments.concat(comment)
      })
  }

  postComment = () => {
    this.getArtistRef().transaction( (artist) => {
       if (artist) { 
          if (artist.commentCount) {
              artist.commentCount++;
          } else {
            if (artist.likeCount) {
              artist.commentCount= 1
            }
          }
        }
        return artist || {
                commentCount: 1
              }
        })
}

  handleSend = () => {
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser
    this.postComment()
    const artistCommentRef = this.getArtistCommentsRef()
    const newCommentRef = artistCommentRef.push();
    newCommentRef.set({
        text,
        userId: uid,
        userPhoto: photoURL
    });
    this.setState({
      text: '',
      changedText: false
    })
  }

  handleChangeText = (text) => {
     this.setState({
       text,
       changedText: true
     })
  }
  
  getArtistRef = () => {
    const { id } = this.props.artist
    return firebaseDB.ref(`artist/${ id }`)
  }

  getArtistCommentsRef = () => {
    const { id } = this.props.artist
    return firebaseDB.ref(`comments/${ id }`)
  }

  render() {

    return (
      <SafeAreaView style={ styles.container }>
        <ArtistBox artist={ this.props.artist }/>
        <ArtistCommentList comments={ this.state.comments}/>
        <View style={ styles.commentComponent }>
            <TextInput
              style={ styles.input }
              onChangeText={ this.handleChangeText }
              placeholder="Send your comment"
              value={ this.state.text }
            />
            <TouchableOpacity style={ styles.send } onPress={ this.handleSend }>
              {
                this.state.changedText ?
                <Icon name="send" size={ 35 } color='grey' /> :
                <Icon name="send" size={ 35 } color='lightgrey' />
              }
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa69d'
  },
  commentComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60, 
    borderColor: 'gray',
    backgroundColor: 'white'
  },
  send: {
    right: 0,
    marginRight: 10
  },
  input: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: 10,
    fontFamily: 'System'
  }

});