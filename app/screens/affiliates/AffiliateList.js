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
import AffiliateDetail from './AffiliateDetail';


class AffiliateList extends Component {

    itemPerPage = 10;

    state = {
        currentPage: 1,
        items: [],
    };

    componentDidMount() {
        this.fetchAffiliate(1);
    }

    fetchAffiliate(page) {
        Get(`books/affiliate/?per_page=${this.itemPerPage}&page=${page}`)
            .then(r => {
                    this.setState({
                        currentPage: r.data.current_page + 1,
                        items: page === 1 ? r.data.rows : this.state.items.concat(r.data.rows),
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
                                        scrollCb={() => this.fetchAffiliate(this.state.currentPage + 1)}
                                        keyExtractor={(item, index)=>index.toString()}
                                        renderItem={({item, index}) => {
                                            const {nama_toko, deskripsi_pendek, thumbnail} = item;
                                            const coverImg = thumbnail === null || typeof(thumbnail)==='undefined' ? react_logo : {uri: thumbnail};
                                            return (
                                                <React.Fragment>
                                                    <ListItem
                                                        title={nama_toko}
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
    Home:{
        screen: injectStore(AffiliateList),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title='Affiliate' {...navProp}/>,
        }),
    },
    Detail: {
        screen: injectStore(AffiliateDetail),
        navigationOptions: (navProp) => ({
            header: <NavigationHeader title={'Affiliate Detail'} isBack={true} {...navProp}/>,
        }),
    }
},{initialRouteName: 'Home'});
