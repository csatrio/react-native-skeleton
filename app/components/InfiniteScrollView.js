import {ScrollView} from 'react-native';
import React from 'react';

export default class InfiniteScrollView extends React.Component {

    constructor(props) {
        super(props);
        const {horizontal, scrollCb, fetchAtDifference} = props;
        this.horizontal = typeof(horizontal) !== 'undefined' ? horizontal : false;
        this.fetchAtDifference = typeof(fetchAtDifference) !== 'undefined' ? fetchAtDifference : 10;
        this.scrollCb = typeof(scrollCb) !== 'undefined' ? scrollCb : () => {
        };
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
            <ScrollView {...this.props} onScroll={this.onScroll}>{this.props.children}</ScrollView>
        );
    }

}



