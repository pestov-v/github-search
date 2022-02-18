import React, { useEffect } from 'react';
import { useRootModel } from '../models/RootStore';

const useGetRepos = (reposUrl: string) => {
  const {
    users: {
      loading,
      activeUser: { getRepos },
    },
  } = useRootModel();
  useEffect(() => {
    if (!reposUrl || loading) return;
    getRepos(reposUrl);
  }, [reposUrl]);
};

export default useGetRepos;
