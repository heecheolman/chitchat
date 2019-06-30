export class Store {
  static _instance: object = {};
  private _state: any;

  private constructor() {
  }

  static get instance() {
    if (!Store._instance) {
      Store._instance = new Store();
    }
    return Store._instance;
  }
}
