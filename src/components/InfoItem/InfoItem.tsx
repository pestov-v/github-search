import React, { FC } from 'react';
import cn from 'classnames';
import style from './InfoItem.module.scss';

type Props = {
  title: string;
  value: string | number | null;
  className?: string;
};

const InfoItem: FC<Props> = ({ title, value, className }) => {
  return (
    <p className={cn(style.item, className)}>
      <b>{title}: </b>
      {value}
    </p>
  );
};

export default InfoItem;
