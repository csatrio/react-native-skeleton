import RouteMain from './RouteMain';
import RouteSide from './RouteSide';
import NavigationHeader from './NavigationHeader';
import stores from '../store/index';
import {Icon} from 'react-native-elements';
import {createStackNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const storeKeys = Object.keys(stores).map(key => key);

function mapStackNavigator(navigationStructure) {
    const remappedNavigation = {};
    Object.keys(navigationStructure).forEach(key => {
        const {screen, title, showHeader, isBack} = navigationStructure[key];
        if (typeof(screen) !== 'undefined') {
            const _title = typeof(title) === 'undefined' ? key : title;
            const _showHeader = typeof(showHeader) === 'undefined' ? true : showHeader;
            const _isBack = typeof(isBack) === 'undefined' ? false : isBack;
            const _screen = inject(...storeKeys)(observer(screen));
            remappedNavigation[key] = {
                screen: _screen,
                navigationOptions: (props) => {
                    return {
                        header: _showHeader ? <NavigationHeader {...props} title={_title} isBack={_isBack}/> : null,
                    };
                },
            };
        }
    });
    return remappedNavigation;
}

const MainNavigationStack = {...mapStackNavigator(RouteMain)};

function mapDrawerNavigator(navigationStructure) {
    const remappedNavigation = {};
    Object.keys(navigationStructure).forEach(key => {
        const stackNavigator = createStackNavigator(MainNavigationStack, {initialRouteName: key});
        const {title, icon} = navigationStructure[key];
        const _title = typeof(title) === 'undefined' ? key : title;
        const iconName = typeof(icon) === 'undefined' ? 'play-arrow' : icon;
        remappedNavigation[key] = {
            screen: stackNavigator,
            navigationOptions: {
                drawerLabel: _title,
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name={iconName}
                        size={30}
                        iconStyle={{
                            width: 30,
                            height: 30,
                        }}
                        type="material"
                        color={tintColor}
                    />
                ),
            },
        };
    });
    return remappedNavigation;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#43484d',
    },
    viewPadding: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawer: {
        marginLeft: 10,
    },
});

const CustomDrawerContentComponent = props => (
    <View style={styles.container}>
        <View
            style={styles.viewPadding}
        >
        </View>
        <View style={styles.drawer}>
            <DrawerItems {...props} />
        </View>
    </View>
);

const MainNavigator = () => createDrawerNavigator(mapDrawerNavigator(RouteSide),
    {
        initialRouteName: 'Home',
        contentOptions: {
            // activeTintColor: '#548ff7',
            // activeBackgroundColor: 'transparent',
            // inactiveTintColor: '#ffffff',
            // inactiveBackgroundColor: 'transparent',
            labelStyle: {
                fontSize: 15,
                marginLeft: 0,
            },
        },
        drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
        contentComponent: CustomDrawerContentComponent,
    },
);

export {MainNavigator};
