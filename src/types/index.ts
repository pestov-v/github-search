import { TRepo } from './repo';

export type TUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
};

export type TActiveUser = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string;
  type: string;
  updated_at: string;
  url: string;
};

export type TUserInfo = {
  Name: string | null;
  Email: string | null;
  Location: string | null;
  'Created At': string;
  Followers: number;
  Following: number;
};

export enum Actions {
  LOADING = 'LOADING',
  FINISHED = 'FINISHED',
  SET_ERROR = 'SET_ERROR',
  SET_USER_TERM = 'SET_USER_TERM',
  SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
  SET_USERS = 'SET_USERS',
  ADD_USERS = 'ADD_USERS',
  SET_USER = 'SET_USER',
  SET_REPOS = 'SET_REPOS',
  SET_PAGE = 'SET_PAGE',
  SET_PAGES_COUNT = 'SET_PAGES_COUNT',
}

export type Action =
  | { type: Actions.LOADING }
  | { type: Actions.FINISHED }
  | { type: Actions.SET_TOTAL_COUNT; payload: number }
  | { type: Actions.SET_USER_TERM; payload: string }
  | { type: Actions.SET_ERROR; payload: string }
  | { type: Actions.SET_USERS; payload: TUser[] }
  | { type: Actions.ADD_USERS; payload: TUser[] }
  | { type: Actions.SET_USER; payload: TActiveUser }
  | { type: Actions.SET_REPOS; payload: TRepo[] }
  | { type: Actions.SET_PAGE; payload: number }
  | { type: Actions.SET_PAGES_COUNT; payload: number };

export type State = {
  items: TUser[];
  user: {
    data: TActiveUser | null;
    repos: TRepo[];
  };
  totalCount: number;
  loading: boolean;
  error: string;
  userTerm: string;
  page: number;
  pagesCount: number;
};

export type StateContent = {
  state: State;
  actions: {
    getUsers: (add?: boolean) => void;
    getUser: (login: string) => void;
    getRepos: (user: string) => void;
    setUserTerm: (term: string) => void;
    setNextPage: () => void;
  };
};
