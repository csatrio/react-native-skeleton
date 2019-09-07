/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Card, Image, Text, Tile, SearchBar, colors} from 'react-native-elements';
import InfiniteScrollView from '../../components/InfiniteScrollView';
import {NavigationHeader} from '../../navigation/index';
import {Get} from '../../network/index';
import IconGrid from './IconGrid';
import {notUndefined} from '../../helpers/index';
import {injectStore} from '../../store/index';

import Article from '../Article';
import BookDetail from '../BookDetail';
import BookList from '../category/BookList';
import akasa from '../../assets/akasa.jpeg';
import react_logo from '../../assets/react-logo.png';
import {Dimensions} from 'react-native';

const BookText = (props) => {
    return <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize: 12}}>{props.children}</Text>;
};

const width = () => Math.round(Dimensions.get('window').width);
const height = () => Math.round(Dimensions.get('window').height);
let searchingHeader = '';

class Home extends Component {
    itemPerPage = 10;
    defaultCategory = 'Umum';

    state = {
        featuredItems: [],
        articleItems: [],
        currentBookPage: 1,
        currentArticlePage: 1,
        search: '',
        searchLoading: false,
    };


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

    searchBook = (keyword) => {
        this.setState({search: keyword, searchLoading: true}, () => {
            searchingHeader = keyword;
            setTimeout(()=>{
                this.props.navigation.navigate('BookList', {search: searchingHeader});
                this.setState({searchLoading: false})
            }, 1500)
        });
    };

    render() {
        const {search, searchLoading, featuredItems, articleItems, currentArticlePage, currentBookPage} = this.state;
        return (
            <Fragment>

                <SafeAreaView>
                    <SearchBar value={this.state.search}
                               placeholder='cari di akasa...'
                               onChangeText={this.searchBook}
                               round={true}
                               containerStyle={{backgroundColor: colors.searchBg}}
                               lightTheme={true}
                               inputContainerStyle={{backgroundColor: '#ffff'}}
                               showLoading={searchLoading}
                    />
                    <ScrollView style={styles.mainScrollView}>
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <Tile imageSrc={akasa}
                                  containerStyle={styles.bannerImage}
                                  height={Math.max(Math.round(0.23 * height()), 150)}
                                  width={Math.round(width() * 0.96)}
                            />
                        </View>

                        <IconGrid/>
                        <Text>{this.state.search}</Text>

                        <View style={styles.featured}>
                            <View style={styles.sectionTextWrapper}><Text
                                style={styles.sectionText}>Featured</Text></View>
                            <InfiniteScrollView fetchAtDifference={10}
                                                scrollCb={() => this.fetchBook(currentBookPage + 1)}
                                                horizontal={true}
                                                keyExtractor={(item, index) => index.toString()}
                                                data={featuredItems}
                                                renderItem={({item, index}) => {
                                                    const {kategori, nama, penerbit, harga, cover} = item;
                                                    const namaKategori = notUndefined(kategori) ?
                                                        notUndefined(kategori.nama_kategori) ? kategori.nama_kategori : this.defaultCategory
                                                        : this.defaultCategory;
                                                    const onPress = () => {
                                                        this.props.navigation.navigate('BookDetail', {'item': item});
                                                    };
                                                    const coverImg = cover === null || !notUndefined(cover) ? react_logo : {uri: cover};
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
                                                                    <BookText>Judul: {nama}</BookText>
                                                                    <BookText>Kategori: {namaKategori}</BookText>
                                                                    <BookText>Penerbit: {penerbit}</BookText>
                                                                    <BookText>Harga: Rp. {harga}</BookText>
                                                                </View>
                                                            </Card>
                                                        </TouchableOpacity>
                                                    );
                                                }}
                            />
                        </View>


                        <View style={styles.article}>
                            <View style={styles.sectionTextWrapper}><Text
                                style={styles.sectionText}>Article</Text></View>
                            <InfiniteScrollView fetchAtDifference={10}
                                                scrollCb={() => this.fetchArticle(currentArticlePage + 1)}
                                                horizontal={true}
                                                keyExtractor={(item, index) => index.toString()}
                                                data={articleItems}
                                                renderItem={({item, index}) => {
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
                                                }}
                            />
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
    bannerImage: {
        padding: 5,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
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
            header: null,
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
    BookList: {
        screen: injectStore(BookList),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title={searchingHeader} isBack={true} {...navProp}/>,
        }),
    },
}, {initialRouteName: 'Home'});
