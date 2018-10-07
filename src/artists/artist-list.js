import React, { Component } from 'react';
import { ListView, StyleSheet, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';

import ArtistBox from './artist-box';

export default class ArtistList extends Component{

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds
    }
  }

  componentDidMount () {
    this.updateDataSource(this.props.artist);
  }

  componentWillReceiveProps(newProps) {
    if ( newProps.artist !== this.props.artist ) {
      this.updateDataSource(newProps.artist)
    }
  }

  updateDataSource = update => {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(update),
    });
  }

  handlePress(artist) {
    Actions.artistProfile({ artist })
  }

  render() {

    return (
        <ListView contentContainer={ styles.contentContainer }
          enableEmptySections={true}
          dataSource={ this.state.dataSource }
          renderRow={(  artist  ) => 
            <TouchableOpacity onPress={ () => this.handlePress(artist) }>
              <ArtistBox artist={ artist } />
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