import RoleStore from "../stores/RoleStore"

export default class RoleAdapter {
    constructor() {
        this.roleStore = new RoleStore();
    }

    async getRoleList() {
        await this.roleStore.getRoleList();
        return this.roleStore.roleList;
    }
}
