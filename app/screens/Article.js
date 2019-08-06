/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from 'react-native';

import {Button, Text} from 'react-native-elements';


class Article extends Component {
    itemPerPage = 10;

    state = {
        articleItems: [],
        currentPage: 1,
    };


    componentDidMount() {
    }


    render() {
        const {judul, kata_kunci, deskripsi_pendek, isi_artikel,} = this.props.navigation.getParam('item')
        return (
            <Fragment>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <Text h4>Article: {judul}</Text>
                            <Text>{isi_artikel}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

export default Article;
