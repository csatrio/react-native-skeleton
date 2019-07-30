export function pad(str, length) {
    const len = Math.round((length - str.length) / 2);
    const len2 = Math.ceil((length - str.length) / 2);
    const paddingLeft = Math.max(len, len2);
    const paddingRight = Math.min(len, len2);
    let _str = str;

    if (len > 0 && len2 > 0) {
        for (let i = 0; i < paddingLeft; i++) {
            _str = ' ' + _str;
        }
        for (let i = 0; i < paddingRight; i++) {
            _str += ' ';
        }
    }

    return _str;
}

export function notUndefined(obj) {
    return typeof(obj) !== 'undefined';
}
