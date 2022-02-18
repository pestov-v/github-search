import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import style from './UserScreen.module.scss';
import { TUserInfo } from '../../types';
import { useRootModel } from '../../models/RootStore';
import useGetUser from '../../hooks/useGetUser';

import UserInfo from '../../components/UserInfo/UserInfo';
import Search from '../../components/Search/Search';
import ReposList from '../../components/ReposList/ReposList';

const UserScreen = () => {
  const { login } = useParams<{ login: string }>();
  const [term, setTerm] = useState('');
  const {
    users: {
      activeUser: { data: user },
    },
  } = useRootModel();

  useGetUser(login);

  if (!user) return <></>;

  const { avatar_url, name, email, location, created_at, followers, following } = user;

  const info: TUserInfo = {
    Name: name,
    Email: email,
    Location: location,
    'Created At': created_at,
    Followers: followers,
    Following: following,
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setTerm(e.target.value);

  return (
    <article className={style.userScreen}>
      <UserInfo info={info} avatar={avatar_url} />
      <Search
        onChange={onChange}
        value={term}
        className={style.search}
        placeholder='Search user repositories'
      />
      <ReposList term={term} />
    </article>
  );
};

export default observer(UserScreen);
