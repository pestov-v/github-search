import React, { FC } from 'react';
import { observer } from 'mobx-react';

import style from './UserInfo.module.scss';
import { TUserInfo } from '../../types';

import InfoItem from '../InfoItem/InfoItem';

type Props = {
  info: TUserInfo;
  avatar: string;
};

const UserInfo: FC<Props> = ({ avatar, info }) => {
  return (
    <section className={style.infoWrapper}>
      <img src={avatar} alt='avatar' className={style.avatar} width={200} height={200} />
      <div className={style.info}>
        {Object.entries(info).map(([title, value]) => (
          <InfoItem key={title} title={title} value={value} />
        ))}
      </div>
    </section>
  );
};

export default observer(UserInfo);
