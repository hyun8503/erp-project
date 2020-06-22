import PlatformStore from "../stores/PlatformStore";

export default class PlatformAdapter {
    constructor() {
        this.platformStore = new PlatformStore();
    }

    async getPlatformList() {
        await this.platformStore.getPlatformList();
        return this.platformStore.platformList;
    }
}