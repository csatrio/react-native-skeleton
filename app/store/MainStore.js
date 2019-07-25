import {observable, action} from 'mobx';

export default class MainStore {
    @observable
    title = 'DefaultTitle';

    @observable
    sideMenuOpen = false;

    @action
    toggleSideMenu = () => {
        this.sideMenuOpen = !this.sideMenuOpen;
    };
}
