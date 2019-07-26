import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-elements';

const rowStyle = {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
}

const Grid = (props) => {
    const {list, size, renderCallback, styling, isCard} = props;
    const card = typeof(isCard) === 'undefined' ? false : isCard;
    const rows = [];
    let tmp = [];

    const style = typeof(styling) === 'undefined' ? rowStyle : {...styling, ...rowStyle};

    for (let i = 0; i < list.length; i++) {
        tmp.push(renderCallback(list[i], i));
        if ((i + 1) % size === 0) {
            if (!card) {
                rows.push(<View key={i + size * 10} style={style}>{tmp}</View>);
            } else {
                rows.push(<View key={i + size * 10} style={style}><Card>{tmp}</Card></View>);
            }
            tmp = [];
        }
    }

    if (tmp.length > 0) {
        if (!card) {
            rows.push(<View key={list.length + size * 10} style={style}>{tmp}</View>);
        } else {
            rows.push(<View key={list.length + size * 10} style={style}><Card>{tmp}</Card></View>);
        }
        tmp = null;
    }

    return <React.Fragment>{rows}</React.Fragment>;
};

export default Grid;
