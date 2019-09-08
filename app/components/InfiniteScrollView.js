import {FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import {emptyFunction, notUndefined} from '../helpers';

export default class InfiniteScrollView extends React.Component {

    static defaultProps = {
        loading: false
    }

    constructor(props) {
        super(props);
        const {horizontal, scrollCb, fetchAtDifference} = props;
        this.horizontal = notUndefined(horizontal) ? horizontal : false;
        this.fetchAtDifference = notUndefined(fetchAtDifference) ? fetchAtDifference : 10;
        this.scrollCb = notUndefined(scrollCb) ? scrollCb : emptyFunction;
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

    render() {
        return (
            <React.Fragment>
                <ActivityIndicator animating={this.props.loading}/>
                <FlatList {...this.props} onScroll={this.onScroll}/>
            </React.Fragment>
        );
    }

}



