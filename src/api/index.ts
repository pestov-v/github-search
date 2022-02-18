import { TActiveUser, TUser } from '../types';
import { TRepo } from '../types/repo';
import { RESULTS_PER_PAGE } from '../constants';

type TGetUsersResponse = {
  items: TUser[];
  total_count: number;
};

const getUsers = async (query: string = '', page: number = 1) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${RESULTS_PER_PAGE}`,
  );
  return (await response.json()) as Promise<TGetUsersResponse>;
};

const getUser = async (login: string = '') => {
  const response = await fetch(`https://api.github.com/users/${login}`);
  const data = await response.json();
  return data as TActiveUser;
};

const getRepos = async (reposUrl: string = '') => {
  const response = await fetch(reposUrl);
  return (await response.json()) as Promise<TRepo[]>;
};

export default {
  getUsers,
  getUser,
  getRepos,
};
