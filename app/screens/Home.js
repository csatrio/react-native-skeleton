/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Card, Icon, Image, Text, Tile, Divider} from 'react-native-elements';
import InfiniteScrollView from '../components/InfiniteScrollView';
import {NavigationHeader} from '../navigation';
import {Get} from '../network';
import Grid from '../components/Grid';
import {notUndefined} from '../helpers';
import {injectStore} from '../store';

import Article from '../screens/Article';
import BookDetail from './BookDetail';
import akasa from '../assets/akasa.jpeg';
import react_logo from '../assets/react-logo.png'

const BookText = (props) => {
    return <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize: 12}}>{props.children}</Text>;
};

class Home extends Component {
    itemPerPage = 10;

    state = {
        featuredItems: [],
        articleItems: [],
        currentBookPage: 1,
        currentArticlePage: 1,
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
        this.fetchArticle();
    }

    fetchBook = (page = this.state.currentBookPage) => {
        Get(`books/buku/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    this.setState({
                        currentBookPage: r.data.current_page,
                        featuredItems: this.state.featuredItems.concat(r.data.rows),
                    });
                },
            );
    };

    fetchArticle = (page = this.state.currentArticlePage) => {
        Get(`books/article/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    this.setState({
                        currentArticlePage: r.data.current_page,
                        articleItems: this.state.articleItems.concat(r.data.rows),
                    });
                },
            );
    };

    render() {
        const {featuredItems, articleItems} = this.state;
        const {navigation} = this.props;
        return (
            <Fragment>

                <StatusBar barStyle="dark-content"/>

                <SafeAreaView>
                    <ScrollView style={styles.mainScrollView}>

                        <Tile imageSrc={akasa} contentContainerStyle={styles.bannerImage} height={150}/>

                        <View>
                            <View style={styles.sectionTextWrapper}><Text style={styles.sectionText}>Icons</Text></View>
                            <Card containerStyle={{marginLeft:2, marginRight:2}}>
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
                                        <TouchableOpacity key={'gridItem' + index} onPress={onPress}>
                                            <Card containerStyle={{marginLeft:0, marginRight:0}}>
                                                <Icon name={icon} type='font-awesome'/>
                                                <Text>{label}</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    );
                                }}
                            </Grid>
                            </Card>
                        </View>


                        <View style={styles.featured}>
                            <View style={styles.sectionTextWrapper}><Text style={styles.sectionText}>Featured</Text></View>
                            <InfiniteScrollView fetchAtDifference={10}
                                                scrollCb={() => this.fetchBook(this.state.currentBookPage + 1)}
                                                horizontal={true}
                            >
                                {featuredItems.map((item, index) => {
                                    const {kategori, nama, penerbit, harga, cover} = item;
                                    const namaKategori = notUndefined(kategori) ? kategori.nama_kategori : 'Umum';
                                    const onPress = () => {
                                        this.props.navigation.navigate('BookDetail', {'item': item});
                                    };
                                    const coverImg = cover === null ? react_logo : {uri: cover}
                                    return (
                                        <TouchableOpacity key={nama} onPress={onPress}>
                                            <Card title={nama} containerStyle={styles.card}>
                                                <View style={styles.bookImageView}>
                                                    <Image
                                                        source={coverImg}
                                                        style={styles.bookImage}
                                                    />
                                                </View>
                                                <View>
                                                    <BookText>Kategori: {namaKategori}</BookText>
                                                    <BookText>Penerbit: {penerbit}</BookText>
                                                    <BookText>Harga: Rp. {harga}</BookText>
                                                </View>
                                            </Card>
                                        </TouchableOpacity>
                                    );
                                })}
                            </InfiniteScrollView>
                        </View>


                        <View style={styles.article}>
                            <View style={styles.sectionTextWrapper}><Text style={styles.sectionText}>Article</Text></View>
                            <InfiniteScrollView fetchAtDifference={10}
                                                scrollCb={() => this.fetchArticle(this.state.currentArticlePage + 1)}
                                                horizontal={true}
                            >
                                {articleItems.map((item, index) => {
                                    const {judul, isi_artikel} = item;
                                    const onPress = () => {
                                        this.props.navigation.navigate('Article', {'item': item});
                                    };
                                    return (
                                        <TouchableOpacity key={'article' + judul} onPress={onPress}>
                                            <Card containerStyle={styles.card}>
                                                <View style={styles.bookImageView}>
                                                    <Image
                                                        source={react_logo}
                                                        style={styles.bookImage}
                                                    />
                                                </View>
                                                <View>
                                                    <BookText>Judul: {judul}</BookText>
                                                    <BookText>Artikel: {isi_artikel}</BookText>
                                                </View>
                                            </Card>
                                        </TouchableOpacity>
                                    );
                                })}
                            </InfiniteScrollView>
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
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 200,
    },
    bannerImage: {},
    divider: {
        marginTop: 1,
        marginBottom: 2,
    },
    sectionTextWrapper: {
        alignItems: 'flex-start',
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    featured: {
        marginTop: 20,
    },
    article: {
        marginTop: 20,
    },
    bookImage: {
        width: 80,
        height: 60,
    },
    bookImageView: {
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

export default createStackNavigator({
    Home: {
        screen: injectStore(Home),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title='Akasa Bookstore' {...navProp}/>,
        }),
    },
    Article: {
        screen: injectStore(Article),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title='Article Detail' isBack={true} {...navProp}/>,
        }),
    },
    BookDetail: {
        screen: injectStore(BookDetail),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title='Book Detail' isBack={true} {...navProp}/>,
        }),
    },
}, {initialRouteName: 'Home'});
