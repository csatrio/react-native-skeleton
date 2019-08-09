import {createAppContainer, createBottomTabNavigator, createStackNavigator, withNavigation} from 'react-navigation';
import {Icon, ThemeProvider, Overlay} from 'react-native-elements';
import {Text} from 'react-native';
import {Theme} from './configuration/index';
import React from 'react';
import {observer, Provider} from 'mobx-react';
import Home from './screens/Home';
import Category from './screens/Category';
import stores, {injectStore} from './store';
import NavigationHeader from './navigation/NavigationHeader';

const TabIcon = (props) => {
    const {focused, horizontal, tintColor, name, type} = props;
    return <Icon name={name}
                 focused={focused}
                 horizontal={horizontal}
                 color={tintColor}
                 type={typeof(type) === 'undefined' ? 'font-awesome' : type}
    />;
};

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: injectStore(Home),
            navigationOptions: (navProps) => ({
                tabBarIcon: (props) => <TabIcon {...props} name='home'/>,
                tabBarLabel: 'Home Screen',
            }),
        },
        Category: {
            screen: injectStore(Category),
            navigationOptions: (navProps) => ({
                tabBarIcon: (props) => <TabIcon {...props} name='sitemap'/>,
                tabBarLabel: 'Category',
            }),
        },
        Settings: {
            screen: Home,
            navigationOptions: (navProps) => ({
                tabBarIcon: (props) => <TabIcon {...props} name='gears'/>,
                tabBarLabel: 'Settings',
            }),
        },
        Accounts: {
            screen: Home,
            navigationOptions: (navProps) => ({
                tabBarIcon: (props) => <TabIcon {...props} name='user'/>,
                tabBarLabel: 'Acccounts',
            }),
        },
    },
    {
        initialRouteName: 'Home',
    },
);

@observer
export default class App extends React.Component {
    render() {
        const store = stores.store
        return <Provider {...stores}>
            <ThemeProvider theme={Theme}>
                <Overlay isVisible={store.debugVisible} onBackdropPress={() => store.closeDebug()}>
                    <Text>{JSON.stringify(store.debugMsg)}</Text>
                </Overlay>
                {React.createElement(createAppContainer(TabNavigator))}
            </ThemeProvider>
        </Provider>;
    }
}
