import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Meta } from '@/layout/Meta';
import { SearchState } from '@/shared/enums/search';
import { Main } from '@/templates/Main';
import { FormSearch } from '@/components/FormSearch';

const Index = () => {
  const [state, setState] = React.useState<SearchState>(SearchState.None);
  const router = useRouter();
  const [term, setTerm] = useState('');

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
      <div className="form">
        <FormSearch
          setTerm={setTerm}
          term={term}
          setState={setState}>
          <div className="buttons">
            <input
              type="submit"
              defaultValue="Pensador Search"
              id="pensador_search"
            />
          </div>
        </FormSearch>
      </div>
    </Main>
  );
};

export default Index;
