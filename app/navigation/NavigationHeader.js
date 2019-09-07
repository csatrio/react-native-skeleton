import React from 'react';
import {Button, colors, Header, Icon} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import {Platform, StyleSheet} from 'react-native';
import {notUndefined} from '../helpers';

@inject('store')
@observer
export default class NavigationHeader extends React.Component {

    menuButtonPress = () => {
      this.props.navigation.pop()
    };

    render() {
        const {title, isBack, onBackPress, centerComponent} = this.props;
        const _centerComponent = notUndefined(centerComponent) ?
            centerComponent
            : {text: title, style: {color: '#fff'}}
        return <Header
            statusBarProps={{ barStyle: 'light-content' }}
            placement='center'
            leftComponent={<Button icon={<Icon name={isBack ? 'chevron-left' : 'home'} type='font-awesome' color='white'/>}
                                   buttonStyle={styles.button}
                                   onPress={notUndefined(onBackPress) ? onBackPress : this.menuButtonPress}/>
            }
            centerComponent={_centerComponent}
            rightComponent={{icon: 'paperclip', color: '#fff', type:'font-awesome'}}
            containerStyle={styles.container}
        />;
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.searchBg,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        margin: 0.5,
    },

    container: {
        height: Platform.OS === 'ios' ? 70 : 50,
        paddingTop: 0,
        marginTop: 0,
        paddingBottom: 2,
        marginBottom: 0,
        justifyContent: 'space-around',
        backgroundColor: colors.searchBg
    }
});
