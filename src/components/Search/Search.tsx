import React, { ChangeEvent, FC } from 'react';
import cn from 'classnames';
import style from './Search.module.scss';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  placeholder?: string;
};

const Search: FC<Props> = ({ value, onChange, className, placeholder }) => {
  return (
    <label className={cn(style.label, className)}>
      <input value={value} onChange={onChange} className={style.input} placeholder={placeholder} />
    </label>
  );
};

export default Search;
