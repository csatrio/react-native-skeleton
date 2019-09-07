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
import react_logo from '../../assets/react-logo.png';

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

class NewsDetail extends Component {

    componentDidMount() {
    }


    render() {
        const {judul, kata_kunci, deskripsi_pendek, isi_artikel, image} = this.props.navigation.getParam('item')
        const coverImg = image === null || typeof(image) === 'undefined' ? react_logo : {uri: image}
        return (
            <Fragment>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <View style={styles.center}><Text h4>{judul}</Text></View>
                            <Image source={coverImg}
                                   style={styles.stretch}
                                   containerStyle={styles.center}
                                   placeholderContent={<ActivityIndicator/>}
                            />
                            <View style={styles.textSection}>
                                <Text style={styles.text}>Keyword: {kata_kunci}</Text>
                                <Text style={{...styles.review, marginTop: 10}}>{isi_artikel}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

export default NewsDetail;
