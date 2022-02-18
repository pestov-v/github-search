import React, { FC } from 'react';
import style from './ReposListItem.module.scss';
import InfoItem from '../../InfoItem/InfoItem';

type Props = {
  name: string;
  forks: number;
  stars: number;
};
const ReposListItem: FC<Props> = ({ name, forks, stars }) => {
  return (
    <li className={style.item}>
      <p className={style.name}>{name}</p>
      <div>
        <InfoItem title='Forks' value={forks} className={style.itemInfo} />
        <InfoItem title='Stars' value={stars} className={style.itemInfo} />
      </div>
    </li>
  );
};

export default ReposListItem;
