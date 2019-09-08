import {FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import React from 'react';
import {emptyFunction, notUndefined} from '../helpers';

export default class InfiniteScrollView extends React.Component {

    static defaultProps = {
        loading: false,
        refreshing: false
    }

    constructor(props) {
        super(props);
        const {horizontal, scrollCb, fetchAtDifference, onRefresh} = props;
        this.horizontal = notUndefined(horizontal) ? horizontal : false;
        this.fetchAtDifference = notUndefined(fetchAtDifference) ? fetchAtDifference : 10;
        this.scrollCb = notUndefined(scrollCb) ? scrollCb : emptyFunction;
        this.onRefresh = notUndefined(onRefresh) ? onRefresh : emptyFunction;
    }

    onScroll = ({nativeEvent}) => {
        const layoutDimension = this.horizontal ? nativeEvent.layoutMeasurement.width : nativeEvent.layoutMeasurement.height;
        const contentDimension = this.horizontal ? nativeEvent.contentSize.width : nativeEvent.contentSize.height;
        const offset = this.horizontal ? nativeEvent.contentOffset.x : nativeEvent.contentOffset.y;
        const difference = Math.floor(contentDimension) - Math.floor(layoutDimension + offset);
        if (difference <= this.fetchAtDifference) {
            this.scrollCb();
        }
    };

    refreshControl = ()=>{
        return (
            <RefreshControl refreshing={this.props.refreshing}/>
        )
    }

    render() {
        return (
            <React.Fragment>
                <ActivityIndicator animating={this.props.loading}/>
                <FlatList {...this.props}
                          onScroll={this.onScroll}
                          refreshControl={this.refreshControl()}
                          onRefresh={this.onRefresh}
                />
            </React.Fragment>
        );
    }

}



