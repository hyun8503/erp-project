import {action, observable} from "mobx";


export default class UserStore {
    @observable isAddUserDialog = false;

    @action initStore = () => {
        this.isAddUserDialog = false;
    }
    
    @action changeIsAddUserDialog = (value) => this.isAddUserDialog = value;
}