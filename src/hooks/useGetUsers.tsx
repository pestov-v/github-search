import React, { useEffect } from 'react';
import { useRootModel } from '../models/RootStore';

const useGetUsers = () => {
  const {
    users: { items, getUsers, usersTerm, loading },
  } = useRootModel();

  useEffect(() => {
    if (!usersTerm || loading) return;
    getUsers();
  }, [usersTerm]);

  return items;
};

export default useGetUsers;
