import React, { useEffect } from 'react';
import { useRootModel } from '../models/RootStore';
import { Instance } from 'mobx-state-tree';
import { UserDataModel } from '../models/UserDataModel';

const useGetUser = (login: string) => {
  const {
    users: {
      activeUser: { getUser, loading, setData },
    },
  } = useRootModel();
  useEffect(() => {
    if (!login || loading) return;
    getUser(login);

    return () => {
      setData({} as Instance<typeof UserDataModel>);
    };
  }, [login]);
};

export default useGetUser;
