import React, { FC } from 'react';
import { observer } from 'mobx-react';

import style from './ReposList.module.scss';
import { useRootModel } from '../../models/RootStore';
import useGetRepos from '../../hooks/useGetRepos';

import ReposListItem from './ReposListItem/ReposListItem';

type Props = {
  term: string;
};
const ReposList: FC<Props> = ({ term }) => {
  const {
    users: {
      activeUser: {
        data: { repos, repos_url },
      },
    },
  } = useRootModel();
  useGetRepos(repos_url);

  return (
    <section className={style.listWrapper}>
      <ul className={style.list}>
        {repos
          .filter((r) => r.name.includes(term))
          .map(({ id, name, forks, stargazers_count }) => (
            <ReposListItem key={id} name={name} forks={forks} stars={stargazers_count} />
          ))}
      </ul>
    </section>
  );
};

export default observer(ReposList);
