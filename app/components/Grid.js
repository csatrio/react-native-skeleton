import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-elements';
import {notUndefined} from '../helpers';

const defaultRowStyle = {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
};

const Grid = (props) => {
    const {list, size, renderCallback, styling, isCard, rowStyle, children} = props;
    const card = notUndefined(isCard) ? false : isCard;
    const rows = [];
    let tmp = [];

    const styleOfRow = notUndefined(rowStyle) ? rowStyle : defaultRowStyle;
    const style = notUndefined(styling) ? styleOfRow : {...styling, ...styleOfRow};
    const renderCb = notUndefined(renderCallback) ? renderCallback : children

    for (let i = 0; i < list.length; i++) {
        tmp.push(renderCb(list[i], i));
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
