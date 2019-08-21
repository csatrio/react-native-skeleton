/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';

import {Text, Image} from 'react-native-elements';
import react_logo from '../assets/react-logo.png';


const WIDTH = Math.round(Dimensions.get('window').width);
const HEIGHT = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    stretch: {
        width: Math.round(WIDTH*0.75),
        height: Math.round(HEIGHT*0.5),
        resizeMode: 'stretch'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class BookDetail extends Component {

    componentDidMount() {
    }


    render() {
        const {kategori, nama, penerbit, harga, cover, review} = this.props.navigation.getParam('item');
        const coverImg = cover === null ? react_logo : {uri: cover}
        return (
            <Fragment>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <View style={styles.center}><Text h4>{nama}</Text></View>
                            <Image source={coverImg}
                                   style={styles.stretch}
                                   containerStyle={styles.center}
                                   placeholderContent={<ActivityIndicator/>}
                            />
                            <Text>Kategori: {kategori.nama_kategori}</Text>
                            <Text>Penerbit: {penerbit}</Text>
                            <Text>Harga: {harga}</Text>
                            <Text>Review: {review}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

export default BookDetail;
