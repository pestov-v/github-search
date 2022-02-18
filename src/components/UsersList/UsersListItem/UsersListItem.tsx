import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import style from './UsersListItem.module.scss';

type Props = {
  login: string;
  avatar: string;
  reposUrl: string;
};

const UsersListItem: FC<Props> = ({ login, avatar, reposUrl }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(reposUrl);
      const data = await response.json();
      setRepos(data);
    };
    fetchData();
  }, []);

  return (
    <li className={style.item}>
      <Link to={`/user/${login}`} className={style.link}>
        <div className={style.nameWrapper}>
          <img className={style.img} width={48} height={48} src={avatar} alt='avatar' />
          <p className={style.name}>{login}</p>
        </div>

        <p className={style.repos}>
          <span className={style.title}>Repositories:</span>
          <span>{repos.length || 0}</span>
        </p>
      </Link>
    </li>
  );
};

export default observer(UsersListItem);
