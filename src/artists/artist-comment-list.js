import React, { Component } from 'react';
import { ListView, StyleSheet, } from 'react-native';

import { Actions } from 'react-native-router-flux';

import Comment from './artist-comment';

export default class ArtistCommentList extends Component{

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds
    }
  }

  componentDidMount () {
    this.updateDataSource(this.props.comments);
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.comments !== this.props.comments ) {
      this.updateDataSource(newProps.comments)
    }
  }

  updateDataSource = update => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(update),
    });
  }

  handlePress(comments) {
    Actions.commentsProfile({ comments })
  }

  render() {

    return (
        <ListView style={ styles.contentContainer }
          enableEmptySections={true}
          dataSource={ this.state.dataSource }
          renderRow={(  comment  ) => 
            <Comment comment={ comment.text } userAvatar={ comment.userPhoto }/>
        }> 
        </ListView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
  }
})