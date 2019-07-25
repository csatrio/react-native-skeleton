import MainStore from './MainStore';
import {Settings} from '../configuration/index';

export default {
    store: new MainStore(),
    settings: new Settings()
};
