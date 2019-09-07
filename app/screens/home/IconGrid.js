import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from 'react-native-elements';
import Grid from '../../components/Grid';
import {notUndefined} from '../../helpers';
import React from 'react';


const styles = StyleSheet.create({
    sectionTextWrapper: {
        alignItems: 'flex-start',
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const gridList = [
    {label: 'Home', icon: 'home'},
    {label: 'Gears', icon: 'gears', to: 'Category'},
    {label: 'Home', icon: 'home'},
    {label: 'Home', icon: 'home'},
    {label: 'Home', icon: 'home'},
    {label: 'Home', icon: 'home'},
    {label: 'Home', icon: 'home'},
    {label: 'Home', icon: 'home'},
    {label: 'Home', icon: 'home'},
];

export default (props) => {
    return (
        <View>
            <View style={styles.sectionTextWrapper}><Text style={styles.sectionText}>Icons</Text></View>
            <Card containerStyle={{marginLeft: 2, marginRight: 2}}>
                <Grid list={gridList} size={3}>
                    {(item, index) => {
                        // render function of the grid is placed here
                        const {icon, label, to, param} = item;
                        const onPress = () => {
                            if (notUndefined(to)) {
                                navigation.navigate(to, notUndefined(param) ? param : {});
                            }
                        };
                        return (
                            <TouchableOpacity key={'gridItem' + index} onPress={onPress}>
                                <Card containerStyle={{marginLeft: 0, marginRight: 0}}>
                                    <Icon name={icon} type='font-awesome'/>
                                    <Text>{label}</Text>
                                </Card>
                            </TouchableOpacity>
                        );
                    }}
                </Grid>
            </Card>
        </View>
    );
}

