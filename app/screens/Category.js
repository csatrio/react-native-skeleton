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
import {Button, Text} from 'react-native-elements';
import InfiniteScrollView from '../components/InfiniteScrollView';
import {NavigationHeader} from '../navigation';
import {Get} from '../network';


class Category extends Component {
    itemPerPage = 10;

    state = {
        categoryItems: [],
        currentPage: 1,
    };


    componentDidMount() {
        this.fetchCategory();
    }

    fetchCategory(page = this.state.currentPage) {
        Get(`books/kategori/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    r.data.rows.forEach((item, index) => {
                        this.state.categoryItems.push(this.categoryRenderCb(item, item.nama + index));
                    });

                    this.setState({
                        currentPage: r.data.current_page,
                        categoryItems: this.state.categoryItems,
                    });
                },
            );
        //.catch(err => this.setState({msg: JSON.stringify(err)}));
    }

    categoryRenderCb = (item, index) => {
        const {nama_kategori} = item;

        return (
            <Button key={nama_kategori + index} title={nama_kategori}/>
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
                            <Text h4>Category</Text>
                            <InfiniteScrollView style={{...styles.featured}}
                                                fetchAtDifference={10}
                                                scrollCb={() => this.fetchCategory(this.state.currentPage + 1)}
                            >{this.state.categoryItems}</InfiniteScrollView>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

const styles = StyleSheet.create({
    featured: {
        backgroundColor: Colors.lighter,
    },
});

export default Category;
