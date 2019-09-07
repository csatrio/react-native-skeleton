/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, View} from 'react-native';
import {ListItem, Text, Divider, Image} from 'react-native-elements';
import {Get} from '../../network/index';
import InfiniteScrollView from '../../components/InfiniteScrollView';
import react_logo from '../../assets/react-logo.png';
import {notUndefined} from '../../helpers';


class BookList extends Component {

    itemPerPage = 10;

    state = {
        currentBookPage: 1,
        items: [],
        link: ''
    };

    componentDidMount() {
        const {navigation} = this.props
        this.is_kategori = notUndefined(navigation.getParam('nama_kategori')) ? true: false;
        this.keyword = notUndefined(navigation.getParam('nama_kategori')) ? navigation.getParam('nama_kategori')
            : navigation.getParam('search')
        this.fetchDetail(this.keyword, 1);
    }

    fetchDetail(keyword, page) {
        const url = this.is_kategori ?
            `books/buku/?per_page=${this.itemPerPage}&page=${page}&kategori__nama_kategori=${keyword}`:
            `books/buku/?per_page=${this.itemPerPage}&page=${page}&nama=${keyword}`;
        Get(url)
            .then(r => {
                    this.setState({
                        currentBookPage: r.data.current_page + 1,
                        items: page === 1 ? r.data.rows : this.state.items.concat(r.data.rows),
                        link: url
                    });
                },
            );
    }


    render() {
        return (
            <Fragment>
                <SafeAreaView>
                    {/*<Text>{this.state.link}</Text>*/}
                    <InfiniteScrollView fetchAtDifference={10}
                                        data={this.state.items}
                                        scrollCb={() => this.fetchDetail(this.keyword, this.state.currentBookPage + 1)}
                                        keyExtractor={(item, index)=>index.toString()}
                                        renderItem={({item, index}) => {
                                            const {kategori, nama, penerbit, harga, cover} = item;
                                            const coverImg = cover === null ? react_logo : {uri: cover};
                                            return (
                                                <React.Fragment>
                                                    <ListItem
                                                        title={nama}
                                                        subtitle={
                                                            <React.Fragment>
                                                                <Text>Harga: Rp. {harga}</Text>
                                                                <Text>Penerbit: {penerbit}</Text>
                                                            </React.Fragment>
                                                        }
                                                        rightAvatar={{
                                                            source: coverImg,
                                                            rounded: false,
                                                            size: 'large',
                                                        }}
                                                        onPress={() => this.props.navigation.navigate('Detail', {item: item})}
                                                    />
                                                    <Divider/>
                                                </React.Fragment>
                                            );
                                        }}
                    >

                    </InfiniteScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

export default BookList;
