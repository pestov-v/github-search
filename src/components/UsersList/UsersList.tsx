import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import style from './UsersList.module.scss';
import { useRootModel } from '../../models/RootStore';
import UsersListItem from './UsersListItem/UsersListItem';
import useGetUsers from '../../hooks/useGetUsers';

const UsersList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    users: { items, getNextPage },
  } = useRootModel();
  useGetUsers();

  useEffect(() => {
    const scrollHandler = async (e: Event) => {
      const target = e.currentTarget as HTMLDivElement;

      if (!ref.current) return;
      if (target.scrollHeight - target.scrollTop - 50 < ref.current.offsetHeight) {
        await getNextPage();
      }
    };
    ref.current?.addEventListener('scroll', scrollHandler);

    return () => {
      ref.current?.removeEventListener('scroll', scrollHandler);
    };
  }, [ref.current]);

  return (
    <div className={style.wrapper} ref={ref}>
      <ul className={style.list}>
        {items.map(({ id, login, avatar_url, repos_url }) => (
          <UsersListItem key={id} login={login} avatar={avatar_url} reposUrl={repos_url} />
        ))}
      </ul>
    </div>
  );
};

export default observer(UsersList);
