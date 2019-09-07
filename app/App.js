import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {Icon, Overlay, ThemeProvider} from 'react-native-elements';
import {Text} from 'react-native';
import {Theme} from './configuration/index';
import React from 'react';
import {observer, Provider} from 'mobx-react';
import Home from './screens/home/Home';
import Category from './screens/category/Category';
import NewsList from './screens/news/NewsList';
import stores, {injectStore} from './store';
import {notUndefined} from './helpers';

const TabIcon = (props) => {
    const {focused, horizontal, tintColor, name, type} = props;
    return <Icon name={name}
                 focused={focused}
                 horizontal={horizontal}
                 color={tintColor}
                 type={notUndefined(type) ? 'font-awesome' : type}
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
                tabBarIcon: (props) => <TabIcon {...props} name='sitemap' type='material'/>,
                tabBarLabel: 'Category',
            }),
        },
        News: {
            screen: NewsList,
            navigationOptions: (navProps) => ({
                tabBarIcon: (props) => <TabIcon {...props} name='rss-square' type='font-awesome'/>,
                tabBarLabel: 'News',
            }),
        },
        Affiliates: {
            screen: Home,
            navigationOptions: (navProps) => ({
                tabBarIcon: (props) => <TabIcon {...props} name='users' type='font-awesome'/>,
                tabBarLabel: 'Affiliates',
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
