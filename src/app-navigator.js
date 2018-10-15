import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconBadge from 'react-native-icon-badge';

import Home from './screens/home';
import Login from './screens/login';
import ArtistProfile from './screens/artist-profile';
import UserProfile from './screens/user-profile';
import Searcher  from './Utils/searcher'


const AppTabNavigator = createBottomTabNavigator ({
    Wall: {
        screen: UserProfile,
    },
    Friends: {
        screen: UserProfile
    },
    Live: {
        screen: UserProfile
    },
    Notifications: {
        screen: UserProfile
    },
    Settings: {
        screen: UserProfile
    }
    },
    {
        navigationOptions: ( {navigation} ) => ({
            tabBarIcon: ( { horizontal, tintColor } ) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Wall') {
                    iconName = 'newspaper'
                } else if (routeName === 'Friends') {
                    iconName='account-multiple'
                } else if (routeName === 'Live') {
                    return  <View style={{ flexDirection: 'row', width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.badgeIconView}>
                                    <Text style={styles.badge}> 2 </Text>
                                </View>
                                <Icon name='youtube-tv' size={ 30 } color={tintColor} />
                            </View>
                } else if (routeName === 'Notifications'){
                    iconName='bell-outline'
                } else if (routeName === 'Settings') {
                    iconName='view-headline'
                }
               
                return <Icon name={iconName} size={ 30 } color={tintColor} />
            }
        }),
        tabBarOptions: {
            activeTintColor: '#2e86de',
            inactiveTintColor: '#b2bec3',
            showLabel: false,
            
          },
    });

const AppStackNavigator = createStackNavigator({
        Login: {
            screen: Login, 
        },
        Home: {
            screen: AppTabNavigator
        },  
    },
    {
        initialRouteKey: Login,
        navigationOptions: {
            header: Searcher,
            headerTintColor: '#2e86de',
        },
    });

    const styles = StyleSheet.create({
        badgeIconView: {
            margin: 1,
            position: 'absolute',
            zIndex: 9999,
            backgroundColor:'red',
            top: 1,
            right: 1,
            borderRadius: 20,
        },
        badge: {
            color: '#fff',
        }
    })

  export default AppStackNavigator;
