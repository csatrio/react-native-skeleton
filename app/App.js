import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {ThemeProvider, Icon} from 'react-native-elements';
import {Theme} from './configuration/index';
import React from 'react';
import {Provider} from 'mobx-react';
import Home from './screens/Home';
import {inject, observer} from 'mobx-react';
import stores from './store';

const storeKeys = Object.keys(stores).map(key => key);
const injectStore = (screen) => inject(...storeKeys)(observer(screen));

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
            screen: Home,
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
        return <Provider {...stores}>
            <ThemeProvider theme={Theme}>
                {React.createElement(createAppContainer(TabNavigator))}
            </ThemeProvider>
        </Provider>;
    }
}
