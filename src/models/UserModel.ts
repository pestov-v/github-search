import { flow, Instance, types } from 'mobx-state-tree';
import api from '../api';
import { UserDataModel } from './UserDataModel';

export const UserModel = types
  .model('UserModel', {
    data: UserDataModel,
    error: types.optional(types.string, ''),
    loading: types.optional(types.boolean, false),
  })
  .actions((user) => {
    const setData = (data: Instance<typeof UserDataModel>) => {
      user.data = data;
    };
    const getUser = flow(function* getUser(login: string) {
      user.loading = true;
      user.error = '';
      try {
        const data = yield api.getUser(login);
        setData(data);
      } catch (e: any) {
        user.error = e.message;
      } finally {
        user.loading = false;
      }
    });
    const getRepos = flow(function* getRepos(reposUrl: string) {
      user.loading = true;
      user.error = '';
      try {
        user.data.repos = yield api.getRepos(reposUrl);
      } catch (e: any) {
        user.error = e.message;
      } finally {
        user.loading = false;
      }
    });
    return { getUser, getRepos, setData };
  });
