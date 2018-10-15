import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import AppNavigator from './src/app-navigator'

export default class App extends Component{
  render() {

    return (
      <AppNavigator />
    )
  }
}

//       <Router>
//         <Scene key="root" renderTitle="Test User" tabs showLabel={ false } hideNavBar={ false  } navigationBarStyle={ styles.navBarProfile } inactiveBackgroundColor='white' >
//             <Scene key="profile" component={ UserProfile } icon={ TabIcon } iconName="newspaper" tabBarOnPress={ this.handleTabPress } />
//             <Scene key="friends" component={ Home } icon={ TabIcon } iconName="account-multiple" />
//             <Scene key="live" component={ Login } icon={ TabIcon } iconName="youtube-tv" />
//             <Scene key="notifications" component={ UserProfile } icon={ TabIcon } iconName="bell-outline" />
//             <Scene key="settings" component={ UserProfile } icon={ TabIcon } iconName="view-headline" />
//         </Scene>
//       </Router>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#aaa69d'
//   },
//   navBar: {
//     backgroundColor: '#aaa69d'
//   },
//   navBarProfile: {
//     backgroundColor: '#22a6b3'
//   }
// });


