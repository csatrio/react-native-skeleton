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
import {createStackNavigator} from 'react-navigation';
import {injectStore} from '../../store';
import NavigationHeader from '../../navigation/NavigationHeader';
import NewsDetail from './NewsDetail';


class NewsList extends Component {

    itemPerPage = 10;

    state = {
        currentPage: 1,
        items: [],
        loading: false,
    };

    componentDidMount() {
        this.fetchNews(1);
    }

    fetchNews = (page) => {
        this.setState({loading: true});
        Get(`books/news/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    this.setState({
                        currentPage: r.data.current_page + 1,
                        items: page === 1 ? r.data.rows : this.state.items.concat(r.data.rows),
                        loading: false,
                    });
                },
            );
    };


    render() {
        return (
            <Fragment>
                <SafeAreaView>
                    <InfiniteScrollView fetchAtDifference={10}
                                        data={this.state.items}
                                        scrollCb={() => this.fetchNews(this.state.currentPage + 1)}
                                        keyExtractor={(item, index) => index.toString()}
                                        loading={this.state.loading}
                                        renderItem={({item, index}) => {
                                            const {judul, deskripsi_pendek, thumbnail} = item;
                                            const coverImg = thumbnail === null || typeof(thumbnail) === 'undefined' ? react_logo : {uri: thumbnail};
                                            return (
                                                <React.Fragment>
                                                    <ListItem
                                                        title={judul}
                                                        subtitle={
                                                            <React.Fragment>
                                                                <Text>{deskripsi_pendek}</Text>
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

export default createStackNavigator({
    Home: {
        screen: injectStore(NewsList),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title='News' {...navProp}/>,
        }),
    },
    Detail: {
        screen: injectStore(NewsDetail),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title={'News Detail'} isBack={true} {...navProp}/>,
        }),
    },
}, {initialRouteName: 'Home'});
