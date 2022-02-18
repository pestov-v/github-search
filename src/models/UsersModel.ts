import { flow, IMSTArray, Instance, types } from 'mobx-state-tree';
import api from '../api';
import { RESULTS_PER_PAGE } from '../constants';
import { UserModel } from './UserModel';

const ItemsModel = types.model('ItemsModel', {
  login: types.string,
  id: types.number,
  node_id: types.string,
  avatar_url: types.string,
  gravatar_id: types.string,
  url: types.string,
  html_url: types.string,
  followers_url: types.string,
  following_url: types.string,
  gists_url: types.string,
  starred_url: types.string,
  subscriptions_url: types.string,
  organizations_url: types.string,
  repos_url: types.string,
  events_url: types.string,
  received_events_url: types.string,
  type: types.string,
  site_admin: types.boolean,
  score: types.number,
});

export type TUsers = IMSTArray<typeof ItemsModel>;
type TUserModel = Instance<typeof UserModel>;

const UsersModel = types
  .model('UsersModel', {
    items: types.array(ItemsModel),
    totalCount: types.optional(types.number, 0),
    page: types.optional(types.number, 1),
    pagesCount: types.optional(types.number, 0),
    usersTerm: types.optional(types.string, ''),
    loading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
    activeUser: types.optional(UserModel, { data: {}, loading: false, error: '' } as TUserModel),
  })
  .actions((users) => {
    const getUsers = flow(function* getUsers() {
      if (users.loading) return;
      users.loading = true;
      users.error = '';
      try {
        const { usersTerm, page } = users;
        const { items, total_count } = yield api.getUsers(usersTerm, page);
        users.items = items;
        users.totalCount = total_count;
        users.pagesCount = Math.floor(total_count / RESULTS_PER_PAGE);
      } catch (e: any) {
        users.error = e.message;
      } finally {
        users.loading = false;
      }
    });
    const setUsersTerm = (term: string) => {
      users.usersTerm = term;
    };
    const setNextPage = () => {
      const { page, pagesCount } = users;
      if (page < pagesCount) {
        users.page = page + 1;
      }
    };
    const getNextPage = flow(function* getNextPage() {
      if (users.loading) return;
      users.loading = true;
      users.error = '';

      try {
        setNextPage();
        const { usersTerm, page } = users;
        const { items, total_count } = yield api.getUsers(usersTerm, page);

        users.items = [...users.items, ...items] as TUsers;
        users.totalCount = total_count;
        users.pagesCount = total_count / RESULTS_PER_PAGE;
      } catch (e: any) {
        users.error = e.message;
      } finally {
        users.loading = false;
      }
    });

    return { getUsers, setUsersTerm, getNextPage };
  });

export default UsersModel;
