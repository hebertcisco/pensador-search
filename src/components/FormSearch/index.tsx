import React, { FormEvent } from 'react';
import { SearchState } from '@/shared/enums/search';
import { useData } from '@/shared/hooks/useData';
import { dbResult } from '@/shared/database/result';
import validForm from '@/utils/validForm';

type Props = {
  setTerm: (term: string) => void;
  term: string;
  setState: (state: SearchState) => void;
};
export const FormSearch: React.FC<Props> = ({ setTerm, term, setState, children }) => {
  const { handleSearch } = useData();

  async function handleSearchEvent(event: FormEvent) {
    event.preventDefault();
    dbResult.result.db
      .table('result')
      .clear()
      .then(() => {
        setState(SearchState.None);
      });
    if (validForm(term)) {
      handleSearch(String(term))
        .then((result) => {
          setState(SearchState.Loading);
          if (result.total !== 0) {
            setState(SearchState.Loaded);
            dbResult.result.add(result).then(() => {
              setState(SearchState.Stored);
            });
          }
        })
        .catch(() => {
          setState(SearchState.Error);
        });
    }
  }
  return (
    <form onSubmit={handleSearchEvent} role="form">
      <label htmlFor="form-search" />
      <input
        type="search"
        id="form-search"
        name="term"
        value={term}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setTerm(event.target.value);
        }}
        placeholder="Pesquisar por frase, poema, etc..."
        required
        autoFocus
      />
      {children}
    </form>
);
};
