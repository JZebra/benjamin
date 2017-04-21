import { observable } from 'mobx';

export default class AppState {
    loggedIn = observable(false);
    virtueSets = observable([]);
    token = observable('');

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
        this.token = '';
    }

    storeToken(token) {
        this.token = token;
    }

    storeVirtueSets(virtueSets) {
        this.virtueSets = virtueSets;
    }
}
