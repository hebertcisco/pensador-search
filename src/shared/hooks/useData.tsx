import React, { useCallback, useContext } from 'react';

import axios from 'axios';

import { HookDataProviderInterface } from '@/shared/interfaces/hook-data-provider.interface';
import { IResult } from '@/shared/interfaces/result.interface';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const handleSearch = useCallback(async (term: string) => {
    return axios.get<IResult>(`/api/search?term=${term}`).then((res) => {
      return res.data;
    });
  }, []);
  const contextValue = {
    handleSearch,
  };
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
export const useData = () =>
  useContext(DataContext) as HookDataProviderInterface;
