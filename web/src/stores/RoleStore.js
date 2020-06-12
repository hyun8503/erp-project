import {action, observable} from "mobx";

export default class RoleStore {
    @observable isAddRoleDialog = false;
   
    @action initStore = () => {
        this.isAddRoleDialog = false;
    }
    
    @action changeIsAddRoleDialog = (value) => this.isAddRoleDialog = value;

   
}