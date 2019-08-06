import MainStore from './MainStore';
import {Settings} from '../configuration/index';
import {inject, observer} from 'mobx-react';

const stores = {
    store: new MainStore(),
    settings: new Settings()
};

const storeKeys = Object.keys(stores).map(key => key);
const injectStore = (screen) => inject(...storeKeys)(observer(screen))

export{storeKeys, injectStore}
export default stores
