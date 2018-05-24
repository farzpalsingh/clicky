import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Animated, } from 'react-native'
import Login from './Login.js'
import FadeInView from './animations/FadeIn'
import Img from './res/retro_logo.png'

export default class Splash extends Component {
    componentDidMount() {
        setTimeout(() => { this.props.navigation.navigate('Login') }, 5000)
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', padding: 10, }} >

                <Image source={Img} style={{ width: 70, height: 100, }} />

                <FadeInView time={4000}>
                    <Text style={styles.h2}>Welcome to Clicky</Text>
                </FadeInView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    h2: {
        alignItems: 'center',
        fontFamily: 'Roboto',
        fontSize: 30,
        color: '#fff',
    },
});


