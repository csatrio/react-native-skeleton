import axios from 'axios';
import {Settings} from '../configuration/index';

const settings = new Settings();
const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

function Get(url) {
    return axios.get(`${settings.apiUrl}${url}`, defaultOptions);
}

export {Get};
