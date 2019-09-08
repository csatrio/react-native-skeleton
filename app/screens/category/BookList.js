/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, ListItem, Text} from 'react-native-elements';
import {Get} from '../../network/index';
import InfiniteScrollView from '../../components/InfiniteScrollView';
import react_logo from '../../assets/react-logo.png';
import {notUndefined} from '../../helpers';


class BookList extends Component {

    itemPerPage = 10;

    state = {
        currentBookPage: 1,
        items: [],
        link: '',
        loading: false,
    };

    componentDidMount() {
        const {navigation} = this.props;
        this.is_kategori = notUndefined(navigation.getParam('nama_kategori')) ? true : false;
        this.keyword = notUndefined(navigation.getParam('nama_kategori')) ? navigation.getParam('nama_kategori')
            : navigation.getParam('search');
        this.fetchList(this.keyword, 1);
    }

    fetchList(keyword, page) {
        this.setState({loading: true});
        const url = this.is_kategori ?
            `books/buku/?per_page=${this.itemPerPage}&page=${page}&kategori__nama_kategori=${keyword}` :
            `books/buku/?per_page=${this.itemPerPage}&page=${page}&nama=${keyword}`;
        Get(url)
            .then(r => {
                    this.setState({
                        currentPage: r.data.current_page + 1,
                        items: page === 1 ? r.data.rows : this.state.items.concat(r.data.rows),
                        link: url,
                        loading: false,
                    });
                },
            );
    }


    render() {
        return (
            <Fragment>
                <SafeAreaView>
                    <InfiniteScrollView fetchAtDifference={10}
                                        data={this.state.items}
                                        scrollCb={() => this.fetchList(this.keyword, this.state.currentBookPage + 1)}
                                        keyExtractor={(item, index) => index.toString()}
                                        loading={this.state.loading}
                                        renderItem={({item, index}) => {
                                            const {kategori, nama, penerbit, harga, cover} = item;
                                            const coverImg = cover === null ? react_logo : {uri: cover};
                                            return (
                                                <React.Fragment>
                                                    <ListItem
                                                        title={nama}
                                                        subtitle={
                                                            <React.Fragment>
                                                                <Text>Price: Rp. {harga}</Text>
                                                                <Text>Publisher: {penerbit}</Text>
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
