/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import {Text} from 'react-native-elements';


class BookDetail extends Component {

    componentDidMount() {
    }


    render() {
        const {kategori, nama, penerbit, harga} = this.props.navigation.getParam('item');
        return (
            <Fragment>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <Text h4>Judul: {nama}</Text>
                            <Text>Kategori: {kategori.nama_kategori}</Text>
                            <Text>Penerbit: {penerbit}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

export default BookDetail;
