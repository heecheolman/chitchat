interface IInstance {
  [key: string]: any;
}

export class Store {
  static _instance: IInstance = {
  };

  private constructor() {
  }

  static get instance() {
    if (!Store._instance) {
      Store._instance = new Store();
    }
    return Store._instance;
  }

  static initState(state: any) {
    if (!Store._instance) {
      Store._instance = new Store();
    }
    Store._instance = {
      ...state
    };
  }

  static setState(state: any) {
    if (!Store._instance) {
      throw Error('Store must be init!');
    }
    Store._instance = {
      ...Store._instance,
      ...state
    }
  }
}
