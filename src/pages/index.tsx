import React, { FormEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Meta } from '@/layout/Meta';
import { dbResult } from '@/shared/database/result';
import { SearchState } from '@/shared/enums/search';
import { useData } from '@/shared/hooks/useData';
import { Main } from '@/templates/Main';
import { validForm } from '@/utils/validForm';

const Index = () => {
  const [term, setTerm] = useState('');
  const [state, setState] = React.useState<SearchState>(SearchState.None);
  const { handleSearch } = useData();
  const router = useRouter();
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
  useEffect(() => {
    if (state === SearchState.Stored) {
      router.push(`/search?term=${term}`).then(() => {
        setState(SearchState.None);
      });
    }
  }, [term, router, state]);
  return (
    <Main
      meta={
        <Meta
          title="Frases, poemas e mensagens no Pensador"
          description="Frases e Pensamentos no Pensador. Colecione e compartilhe frases, textos, poemas, versos, poesias, mensagens e citações."
        />
      }
    >
      {/* PENSADOR IMG */}
      <div className="pensador">
        <div id="pensador_logo">
          <img
            src="/assets/images/psychology-ga23f2e239_1920.png"
            alt="Pensador"
          />
        </div>
      </div>
      {state === SearchState.None && <p>None</p>}
      {state === SearchState.Loading && <p>Loading</p>}
      {state === SearchState.Loaded && <p>Loaded</p>}
      {state === SearchState.Error && <p>Error</p>}
      <div className="form">
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
          <div className="buttons">
            <input
              type="submit"
              defaultValue="Pensador Search"
              id="pensador_search"
            />
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Index;
