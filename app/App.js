import {createAppContainer} from 'react-navigation';
import {ThemeProvider} from 'react-native-elements';
import {Theme} from './configuration/index';
import React from 'react';
import {Provider} from 'mobx-react';
import stores from './store/index';
import {MainNavigator, NavigationSide} from './navigation/index';
import {observer} from 'mobx-react';

@observer
export default class App extends React.Component {
    render() {
        return <Provider {...stores}>
            <ThemeProvider theme={Theme}>
                {React.createElement(createAppContainer(MainNavigator()))}
            </ThemeProvider>
        </Provider>;
    }
}
