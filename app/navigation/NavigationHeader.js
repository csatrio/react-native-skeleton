import React from 'react';
import {Button, Header, Icon} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {Platform, StyleSheet} from 'react-native';

@inject('store')
@observer
export default class NavigationHeader extends React.Component {

    menuButtonPress = () => {
        if (!this.props.isBack) {
            this.props.navigation.toggleDrawer();
        }
        else {
            this.props.navigation.pop();
        }

    };

    render() {
        const {title, isBack} = this.props;
        return <Header
            placement='center'
            leftComponent={<Button icon={<Icon name={isBack ? 'chevron-left' : 'th'} type='font-awesome'/>}
                                   onPress={this.menuButtonPress}/>}
            centerComponent={{text: title, style: {color: '#fff'}}}
            rightComponent={{icon: 'home', color: '#fff'}}
            containerStyle={styles.container}
        />;
    }
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 70 : 50,
        paddingTop: 0,
        marginTop: 0,
        paddingBottom: 2,
        marginBottom: 0,
    }
});
