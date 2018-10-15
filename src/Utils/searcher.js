import React, { Component } from 'react';
import { SafeAreaView, TextInput, StyleSheet, View,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Searcher (props){
    return (
        <SafeAreaView style={ styles.safeArea }>
            <View style={ styles.container }>
                <Icon name='chevron-left' size={ 30 } color='#f5f6fa'/>
                <View style={ styles.searcher }>
                    <Icon style={{ marginHorizontal: 5 }} name='magnify' size={ 22 } color='grey'/>
                    <TextInput
                        style={{ marginRight: 5, color: '#f5f6fa', fontWeight: '500', fontSize: 13}}
                        defaultValue='Louie Louie Rama Lamadindon'
                    />
                </View>
                <Icon name='account-box-multiple' size={ 25 } color='white' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#3b5998'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b5998',
        height: 50
    },
    searcher:{
        paddingVertical: 5,
        width: 280,
        height: 30,
        borderRadius: 150,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#273c75',
        marginHorizontal: 10
    }
})