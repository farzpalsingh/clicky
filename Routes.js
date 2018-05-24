import { StackNavigator, } from "react-navigation";
import Splash from './Splash';
import Login from './Login';
import Board from './Board';
import GameOver from './GameOver';
import Waiting from './Waiting';

export const GameOverView = StackNavigator({
    GameOver: {
        screen: GameOver,
    },

},
    {
        headerMode: 'none',
    }
)

export const BoardNavigator = StackNavigator(
    {
        Waiting: {
            screen: Waiting,
            navigationOptions: {
                title: 'Game Lobby',
            }
        },
        Board: {
            screen: Board,
            navigationOptions: {
                title: 'Game Board',
                headerLeft: null,
                gesturesEnabled: false,
            },
        },
        GameOverView: {
            screen: GameOverView,
            navigationOptions: {
                title: 'Game Over',
                headerLeft: null,
                gesturesEnabled: false,
            }
        },
    }
)

export const RootNavigator = StackNavigator(
    {
        Splash: {
            screen: Splash,
        },
        Login: {
            screen: Login,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        BoardNavigator: {
            screen: BoardNavigator,
        },
    },
    {
        headerMode: 'none',
    }
)
