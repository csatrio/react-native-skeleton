import {action, observable} from 'mobx';

export default class MainStore {
    @observable
    debugMsg = null;

    @observable
    debugVisible = false;

    @action
    closeDebug = () => {
        this.debugVisible = false;
        this.debugMsg = null;
    };

    @action
    showDebug = (msg) => {
        this.debugMsg = msg;
        this.debugVisible = true;
    };
}
