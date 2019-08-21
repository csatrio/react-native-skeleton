/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {ListItem, Text, Divider, Image} from 'react-native-elements';
import {Get} from '../../network/index';
import InfiniteScrollView from '../../components/InfiniteScrollView';
import react_logo from '../../assets/react-logo.png';


class BookList extends Component {

    itemPerPage = 10;

    state = {
        currentBookPage: 1,
        items: [],
    };

    componentDidMount() {
        this.nama_kategori = this.props.navigation.getParam('nama_kategori');
        this.fetchDetail(this.nama_kategori, 1);
    }

    fetchDetail(nama_kategori, page) {
        Get(`books/buku/?per_page=${this.itemPerPage}&page=${page}&kategori__nama_kategori=${nama_kategori}`)
            .then(r => {
                    this.setState({
                        currentBookPage: r.data.current_page + 1,
                        items: this.state.items.concat(r.data.rows),
                    });
                },
            );
    }


    render() {
        return (
            <Fragment>
                <SafeAreaView>
                    <Text/>
                    <InfiniteScrollView fetchAtDifference={10}
                                        scrollCb={() => this.fetchDetail(this.nama_kategori, this.state.currentBookPage + 1)}>
                        {this.state.items.map((item, index) => {
                            const {kategori, nama, penerbit, harga, cover} = item;
                            const coverImg = cover === null ? react_logo : {uri: cover}
                            return (
                                <React.Fragment key={index}>
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
                                            rounded:false,
                                            size:'large'
                                        }}
                                        onPress={() => this.props.navigation.navigate('Detail', {item: item})}
                                    />
                                    <Divider/>
                                </React.Fragment>
                            );
                        })}
                    </InfiniteScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

export default BookList;
