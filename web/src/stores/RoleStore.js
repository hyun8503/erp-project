import {action, observable} from "mobx";

const items = [
    {key:0, label:'보고서제출'},
    {key:1, label:'보고서검색'},
]

export default class RoleStore {
    @observable isAddRoleDialog = false;
   
    @action initStore = () => {
        this.isAddRoleDialog = false;
    }
    
    @action changeIsAddRoleDialog = (value) => this.isAddRoleDialog = value;

   
}