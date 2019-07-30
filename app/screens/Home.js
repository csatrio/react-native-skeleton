/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from 'react-native';

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
                        this.state.bannerItems.push(this.bookRenderCb(item, item.nama + index));
                    });

                    this.setState({
                        currentPage: r.data.current_page,
                        bannerItems: this.state.bannerItems,
                        // msg: JSON.stringify(r.data.rows)
                    });
                },
            );
        //.catch(err => this.setState({msg: JSON.stringify(err)}));
    }

    bookRenderCb = (item, index) => {
        const {kategori, nama, penerbit, tanggal_terbit, review, in_stock} = item;
        const namaKategori = notUndefined(kategori) ? kategori.nama_kategori : 'Umum';

        return (
            <Card key={index} title={nama} containerStyle={styles.card}>
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
    };

    gridRenderCb = (item, index) => {
        const {icon, label, to, param} = item;
        const onPress = () => {
            if (notUndefined(to)) {
                this.props.store.showDebug('onPress Grid')
                this.props.navigation.navigate(to);
            }
        }
        return (
            <View key={'gridItem' + index}>
                <Card>
                    <Icon name={icon} type='font-awesome' onPress={onPress}/>
                    <Text onPress={onPress}>{label}</Text>
                </Card>
            </View>
        );
    };

    render() {
        return (
            <Fragment>
                <NavigationHeader title='Akasa Bookstore'/>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <Text h4>Icons</Text>
                            <Grid list={this.gridList}
                                  renderCallback={this.gridRenderCb}
                                  size={3}
                            />
                        </View>

                        <View>
                            <Text h4>Featured</Text>
                            <InfiniteScrollView style={{...styles.scrollView}}
                                                fetchAtDifference={10}
                                                scrollCb={() => this.fetchBook(this.state.currentPage + 1)}
                                                horizontal={true}
                            >{this.state.bannerItems}</InfiniteScrollView>
                        </View>

                        <View>
                            <Text h4>Terlaris</Text>
                            <InfiniteScrollView style={{...styles.scrollView}}
                                                fetchAtDifference={10}
                                                scrollCb={() => this.fetchBook(this.state.currentPage + 1)}
                                                horizontal={true}
                            >{this.state.bannerItems}</InfiniteScrollView>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
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
