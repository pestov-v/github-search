import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';

import style from './SearchScreen.module.scss';
import { useRootModel } from '../../models/RootStore';

import Search from '../../components/Search/Search';
import UsersList from '../../components/UsersList/UsersList';

const SearchScreen = () => {
  const {
    users: { setUsersTerm, usersTerm, totalCount },
  } = useRootModel();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setUsersTerm(e.target.value);

  return (
    <article className={style.container}>
      <Search onChange={onChange} value={usersTerm} placeholder='Search users' />
      <p className={style.total}>Total users: {totalCount}</p>
      <UsersList />
    </article>
  );
};

export default observer(SearchScreen);
