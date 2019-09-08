/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Card, colors, Icon, Image, SearchBar, Text, Tile} from 'react-native-elements';
import InfiniteScrollView from '../../components/InfiniteScrollView';
import {NavigationHeader} from '../../navigation/index';
import {Get} from '../../network/index';
import {notUndefined} from '../../helpers/index';
import {injectStore} from '../../store/index';

import Article from '../Article';
import BookDetail from '../BookDetail';
import BookList from '../category/BookList';
import akasa from '../../assets/akasa.jpeg';
import react_logo from '../../assets/react-logo.png';

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
        bookLoading: false,
        articleLoading: false,
    };


    componentDidMount() {
        this.fetchBook();
        this.fetchArticle();
    }

    fetchBook = (page = this.state.currentBookPage) => {
        this.setState({bookLoading: true})
        Get(`books/buku/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    this.setState({
                        currentBookPage: r.data.current_page,
                        featuredItems: this.state.featuredItems.concat(r.data.rows),
                        bookLoading: false
                    });
                },
            );
    };

    fetchArticle = (page = this.state.currentArticlePage) => {
        this.setState({articleLoading: true})
        Get(`books/article/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    this.setState({
                        currentArticlePage: r.data.current_page,
                        articleItems: this.state.articleItems.concat(r.data.rows),
                        articleLoading: false
                    });
                },
            );
    };

    searchBook = (keyword) => {
        this.setState({search: keyword, searchLoading: true}, () => {
            searchingHeader = keyword;
            setTimeout(() => {
                this.props.navigation.navigate('BookList', {search: searchingHeader});
                this.setState({searchLoading: false});
            }, 1500);
        });
    };

    render() {
        const {searchLoading, featuredItems, articleItems} = this.state;
        return (
            <Fragment>

                <SafeAreaView>
                    <SearchBar value={this.state.search}
                               placeholder='search book in akasa...'
                               onChangeText={this.searchBook}
                               round={true}
                               containerStyle={{backgroundColor: colors.searchBg}}
                               lightTheme={false}
                               inputContainerStyle={{backgroundColor: '#ffff'}}
                               showLoading={searchLoading}
                    />
                    <ScrollView style={styles.mainScrollView}>
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <Tile imageSrc={akasa}
                                  containerStyle={styles.bannerImage}
                                  height={Math.max(Math.round(0.23 * height()), 150)}
                                  width={Math.round(width() * 0.952)}
                            />
                        </View>

                        <View style={styles.featured}>
                            <View style={styles.sectionTextWrapper}><Text
                                style={styles.sectionText}>Featured</Text></View>
                            <InfiniteScrollView fetchAtDifference={10}
                                                scrollCb={() => this.fetchBook(this.state.currentBookPage + 1)}
                                                horizontal={true}
                                                keyExtractor={(item, index) => index.toString()}
                                                data={featuredItems}
                                                loading={this.state.bookLoading}
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
                                                                <View style={styles.justify}>
                                                                    <BookText>Price: Rp. {harga}</BookText>
                                                                    <BookText>Category: {namaKategori}</BookText>
                                                                    <BookText>Publisher: {penerbit}</BookText>
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
                                                scrollCb={() => this.fetchArticle(this.state.currentArticlePage + 1)}
                                                horizontal={true}
                                                keyExtractor={(item, index) => index.toString()}
                                                data={articleItems}
                                                loading={this.state.articleLoading}
                                                renderItem={({item, index}) => {
                                                    const {judul, deskripsi_pendek, thumbnail} = item;
                                                    const onPress = () => {
                                                        this.props.navigation.navigate('Article', {'item': item});
                                                    };
                                                    const thumb = thumbnail === null || !notUndefined(thumbnail) ? react_logo : {uri: thumbnail};
                                                    return (
                                                        <TouchableOpacity key={'article' + judul} onPress={onPress}>
                                                            <Card containerStyle={styles.card}>
                                                                <View style={styles.bookImageView}>
                                                                    <Image
                                                                        source={thumb}
                                                                        style={styles.bookImage}
                                                                    />
                                                                </View>
                                                                <View style={styles.justify}>
                                                                    <BookText>Title: {judul}</BookText>
                                                                    <BookText>Description: {deskripsi_pendek}</BookText>
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
        marginTop: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.greyOutline,
    },
    divider: {
        marginTop: 1,
        marginBottom: 2,
    },
    sectionTextWrapper: {
        alignItems: 'flex-start',
    },
    sectionText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    featured: {
        marginTop: 20,
    },
    article: {
        marginTop: 30,
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
        width: 180,
        height: 250,
    },
    bookText: {
        flex: 1,
        flexDirection: 'row',
    },
    justify: {
        textAlign: 'justify',
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
        navigationOptions: (navProp) => {
            const centerComponent = (
                <React.Fragment>
                    <Icon name='search' type='font-awesome'/>
                    <Text>{searchingHeader}</Text>
                </React.Fragment>
            );
            return ({
                header: <NavigationHeader title={searchingHeader} centerComponent={centerComponent}
                                          isBack={true} {...navProp}/>,
            });
        },
    },
}, {initialRouteName: 'Home'});
