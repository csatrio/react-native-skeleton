/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {Image, Text} from 'react-native-elements';
import react_logo from '../assets/react-logo.png';
import {notUndefined} from '../helpers';


const WIDTH = Math.round(Dimensions.get('window').width);
const HEIGHT = Math.round(Dimensions.get('window').height);
const defaultCategory = 'Umum';

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
    },
    textSection: {
        marginTop: 20,
        marginLeft: 5
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    review: {
        fontSize:16,
    },
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
                            <View style={styles.textSection}>
                                <Text style={styles.text}>Price: {harga}</Text>
                                <Text style={styles.text}
                                >Category: {notUndefined(kategori) ? kategori.nama_kategori : defaultCategory}</Text>
                                <Text style={styles.text}>Publisher: {penerbit}</Text>
                                <Text style={{...styles.text, marginTop: 10}}>Review:</Text>
                                <Text style={styles.review}>{review}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

export default BookDetail;
