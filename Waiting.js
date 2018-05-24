import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, Platform } from "react-native";
import { List, ListItem } from 'react-native-elements';
import Board from './Board'

export default class Waiting extends Component {

    state = {
        name: this.props.navigation.state.params.name,
        data: null,
        time: null,
        color: null,
    }
    constructor(props) {
        super(props)

        this.showTimer = this.showTimer.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.NotEnoughPlayers = this.NotEnoughPlayers.bind(this)
        this.showDialog = this.showDialog.bind(this)
        this.setData = this.setData.bind(this)
        this.showMessage = this.showMessage.bind(this)

        //When minimun players=false(EVENT)
        this.props.navigation.state.params.socket.on('NOT_ENOUGH_PLAYERS', this.NotEnoughPlayers)

        //On Message
        this.props.navigation.state.params.socket.on('SHOW_MESSAGE', this.showMessage)

        //Asking for players
        this.props.navigation.state.params.socket.emit('SEND_PLAYER', this.setData)

        //gettign players
        this.props.navigation.state.params.socket.on('PLAYER_LIST', this.setData = (nicknames) => this.setState({ data: nicknames }))

        //On Time recieved
        this.props.navigation.state.params.socket.on('TIMER', this.showTimer)

    }

    //Displaying server messages
    showMessage = function (msg, color) {
        if (msg === 'Starting game session. Starting count down.') {
            this.showDialog(msg, color)
            this.props.navigation.state.params.socket.emit('START_TIMER')
        }
        else {
            this.showDialog(msg, color)
        }
    }

    //Setting the data player list
    setData = function (names) {
        this.setData({ data: names })
    }

    //When players are not enough
    NotEnoughPlayers = function () {
        this.showDialog('Not enough players, try again in a little bit.', 'red')
    }

    //Showing Timer
    showTimer = function (timeLeft) {
        this.setState({ time: timeLeft })
        if (timeLeft < 1) {
            this.props.navigation.navigate('Board', { name: this.props.navigation.state.params.name, socket: this.props.navigation.state.params.socket })
        }
    }

    //Alert dialog
    showDialog = function (message, color) {
        this.setState({ msg: message })
        this.setState({ color: color })
        setTimeout(this.hideDialog, 3000)
    }

    //Disposing alert
    hideDialog = function () {
        this.setState({ msg: null })
        this.setState({ color: null })
    }

    render() {
        debugger
        var { data } = this.state
        debugger
        console.log(data)
        /*if (this.state.data) {
            debugger
            console.log(data)
            return (
                <View style={{
                    flex: 1,
                }}>
                    
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>{this.state.time}</Text>
                    {(() => {
                        switch (this.state.color) {
                            case "red": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#f8577e' }]}><Text>{this.state.msg}</Text></View>;

                            case "green": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#56F9BB' }]}><Text>{this.state.msg}</Text></View>;

                            default: return <View />;
                        }
                    })()}
                </View>
            )
        }
        else {*/
            return (
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>{this.state.time}</Text>
                    {
                        (() => {
                            switch (this.state.color) {
                                case "red": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#f8577e' }]}><Text>{this.state.msg}</Text></View>;

                                case "green": return <View style={[styles.shadows, { padding: 20, margin: 20, justifyContent: 'center', borderRadius: 4, backgroundColor: '#56F9BB' }]}><Text>{this.state.msg}</Text></View>;

                                default: return <View />;
                            }
                        })()
                    }
                </View>
            )
        //}
    }
}

const styles = StyleSheet.create({
    shadows: {
        ...Platform.select({
            ios: {
                shadowColor: 'grey',
                shadowOffset: { height: 1 },
                shadowRadius: 10,
                shadowOpacity: 1,
            },
            android: {
                elevation: 4,
            }
        })
    },
})