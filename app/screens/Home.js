/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Card, Icon, Image, Text} from 'react-native-elements';
import InfiniteScrollView from '../components/InfiniteScrollView';
import {NavigationHeader} from '../navigation';
import {Get} from '../network';
import Grid from '../components/Grid';
import {notUndefined} from '../helpers';

const BookText = (props) => {
    return <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize: 12}}>{props.children}</Text>;
};

class Home extends Component {
    itemPerPage = 10;

    state = {
        bannerItems: [],
        currentPage: 1,
    };

    gridList = [
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

    componentDidMount() {
        this.fetchBook();
    }

    fetchBook(page = this.state.currentPage) {
        Get(`books/buku/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    r.data.rows.forEach((item, index) => {
                        const {kategori, nama, penerbit, tanggal_terbit, review, in_stock} = item;
                        const namaKategori = notUndefined(kategori) ? kategori.nama_kategori : 'Umum';
                        const book = (
                            <Card key={item.nama + index} title={nama} containerStyle={styles.card}>
                                <Image
                                    source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                                    style={styles.bookImage}
                                />
                                <View>
                                    <BookText>Kategori: {namaKategori}</BookText>
                                    <BookText>Penerbit: {penerbit}</BookText>
                                    <BookText>Review: {review}</BookText>
                                </View>
                            </Card>
                        );
                        this.state.bannerItems.push(book);
                    });

                    this.setState({
                        currentPage: r.data.current_page,
                        bannerItems: this.state.bannerItems,
                        // msg: JSON.stringify(r.data.rows)
                    });
                },
            );
    }

    render() {
        const {bannerItems, currentPage} = this.state;
        const {navigation} = this.props;
        return (
            <Fragment>
                <NavigationHeader title='Akasa Bookstore'/>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView style={styles.mainScrollView}>
                        <View>
                            <Text h4>Icons</Text>
                            <Grid list={this.gridList} size={3}>
                                {(item, index) => {
                                    // render function of the grid is placed here
                                    const {icon, label, to, param} = item;
                                    const onPress = () => {
                                        if (notUndefined(to)) {
                                            navigation.navigate(to, notUndefined(param) ? param : {});
                                        }
                                    };
                                    return (
                                        <View key={'gridItem' + index}>
                                            <TouchableOpacity onPress={onPress}>
                                                <Card>
                                                    <Icon name={icon} type='font-awesome'/>
                                                    <Text>{label}</Text>
                                                </Card>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            </Grid>
                        </View>

                        <View>
                            <Text h4>Featured</Text>
                            <InfiniteScrollView style={{...styles.featured}}
                                                fetchAtDifference={10}
                                                scrollCb={() => this.fetchBook(currentPage + 1)}
                                                horizontal={true}
                            >{bannerItems}</InfiniteScrollView>
                        </View>

                        <View>
                            <Text h4>Terlaris</Text>
                            <InfiniteScrollView style={{...styles.featured}}
                                                fetchAtDifference={10}
                                                scrollCb={() => this.fetchBook(currentPage + 1)}
                                                horizontal={true}
                            >{bannerItems}</InfiniteScrollView>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

const styles = StyleSheet.create({
    mainScrollView: {
        marginBottom: 35,
        paddingBottom: 200,
    },
    featured: {
        backgroundColor: Colors.lighter,
        marginBottom: 20,
    },
    bookImage: {
        width: 80,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
    },
    card: {
        margin: 2,
        width: 150,
        height: 200,
    },
    bookText: {
        flex: 1,
        flexDirection: 'row',
    },

});

export default Home;
