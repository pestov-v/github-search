import { useContext, createContext } from 'react';
import { types, Instance, addMiddleware } from 'mobx-state-tree';
import UsersModel from './UsersModel';

const RootStore = types.model('RootStore', {
  users: types.optional(UsersModel, {}),
});

const defaultStore = {
  users: {
    error: '',
    page: 1,
    items: [],
    totalCount: 0,
    loading: false,
    activeUser: {
      data: {},
      loading: false,
      error: '',
    },
    pagesCount: 0,
    usersTerm: '',
  },
};

let _store: any = null;

export const initializeStore = () => {
  _store = RootStore.create(defaultStore);
  return _store;
};

export type RootInstance = Instance<typeof RootStore>;
const RootStoreContext = createContext<null | RootInstance>(null);
export const Provider = RootStoreContext.Provider;

export const useRootModel = (): Instance<typeof RootStore> => {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
};
