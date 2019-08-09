/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import {Button, Text, Divider} from 'react-native-elements';
import {NavigationHeader} from '../navigation';
import {Get} from '../network';
import {notUndefined} from '../helpers';
import {injectStore} from '../store';
import BookList from './BookList'
import BookDetail from './BookDetail'


class Category extends Component {
    itemPerPage = 10;

    state = {
        categoryItems: [],
        currentPage: 1,
        txt: '-',
    };


    componentDidMount() {
        this.fetchCategory();
    }

    fetchCategory(page = this.state.currentPage) {
        Get(`books/kategori/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    this.setState({
                        currentBookPage: r.data.current_page,
                        categoryItems: this.state.categoryItems.concat(r.data.rows),
                    });
                },
            );
    }

    render() {
        const {categoryItems} = this.state;
        return (
            <Fragment>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView>
                        {categoryItems.map(({nama_kategori, icon}, index) => (
                            <React.Fragment key={'item' + index}>
                                <ListItem
                                    title={nama_kategori}
                                    leftIcon={{name: notUndefined(icon) ? icon : 'plus-square', type: 'font-awesome'}}
                                    rightIcon={{name: 'chevron-right', type: 'font-awesome'}}
                                    onPress={() => this.props.navigation.navigate('List', {nama_kategori: nama_kategori})}
                                />
                                <Divider/>
                            </React.Fragment>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    };
}

const styles = StyleSheet.create({});

export default createStackNavigator({
    Category:{
        screen: injectStore(Category),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title='Kategori Buku' {...navProp}/>,
        }),
    },
    List: {
        screen: injectStore(BookList),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title={navProp.navigation.getParam('nama_kategori')} isBack={true} {...navProp}/>,
        }),
    },
    Detail: {
        screen: injectStore(BookDetail),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title={navProp.navigation.getParam('item').nama} isBack={true} {...navProp}/>,
        }),
    }
},{initialRouteName: 'Category'});
