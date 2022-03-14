import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { Meta } from '@/layout/Meta';
import { LINKS_LIST } from '@/shared/constants';
import { dbResult } from '@/shared/database/result';
import { SearchState } from '@/shared/enums/search';
import { IPhrases, IResult } from '@/shared/interfaces/result.interface';
import { AppConfig } from '@/utils/AppConfig';
import { AjaxLoader } from '@/components/AjaxLoader';
import { FormSearch } from '@/components/FormSearch';

export const getServerSideProps = ({ query }: any) => ({
  props: query,
});

const Search = ({ city, region, country }: any) => {
  const router = useRouter();
  const { query } = router;
  const [term, setTerm] = useState('');
  const [results, setResults] = React.useState<IResult>({} as IResult);
  const [state, setState] = React.useState<SearchState>(SearchState.None);
  const [phrases, setPhrases] = React.useState<IPhrases[] | any>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setState(SearchState.Loading);
    dbResult.result.toArray().then((result) => {
      if (result.length !== 0) {
        setState(SearchState.Loaded);
        setResults(result[0] as IResult);

        const _phrases = result[0]?.frases.map((phrase: IPhrases) => phrase) as IPhrases[];
        const pageSize = _phrases.length;

        setCurrentPage(Number(query.page) * 10 || 10);

        const start = (currentPage / pageSize) * pageSize;
        const end = start + 10;

        setPhrases(_phrases.slice(start, end));
        setState(SearchState.Success);

      } else {
        setState(SearchState.Error);
      }
    });
  }, [query.term]);
  return (
    <>
      <Meta
        title={`${query.term} - ${AppConfig.site_name}`}
        description="Frases e Pensamentos no Pensador. Colecione e compartilhe frases, textos, poemas, versos, poesias, mensagens e citações."
      />
      <style jsx>
        {`
          * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            font-family: 'Roboto', arial, sans-serif;
          }

          body {
            margin: 0;
            font-size: 13px;
          }

          ul {
            margin: 0;
            padding: 0;
          }

          li {
            display: inline;
          }

          img {
            width: 100px;
            display: inline;
            margin: 25px;
            vertical-align: top;
          }

          input {
            display: inline;
            width: 620px;
            height: 40px;
            padding: 10px;
            border-radius: 20px;
            border: 1px solid rgb(199, 199, 199);
            vertical-align: top;
          }

          h2 {
            font-weight: normal;
            margin: 0 0 3px 0;
          }

          h2 a {
            color: rgb(208, 35, 8, 1);
          }

          h2 a:hover {
            text-decoration: underline;
          }

          .link {
            color: green;
            font-size: 14px;
          }

          a {
            text-decoration: none;
            color: rgb(48, 48, 48);
          }

          p {
            margin: 0;
          }

          span {
            color: rgb(150, 150, 150);
          }

          .topContainer {
            display: block;
            border-bottom: 1px solid rgb(209, 209, 209);
          }

          .accountOptions {
            display: inline;
            float: right;
            padding: 20px;
            margin-top: 0;
          }

          .accountOptions li {
            padding: 10px;
          }

          .fa-th {
            color: #545454;
            font-size: 1.3em;
          }

          .fa-angle-right {
            font-size: 18px;
          }

          .signIn {
            display: inline;
            border-radius: 3px;
            border: none;
            padding: 10px;
            width: 70px;
            color: white;
            background: rgb(208, 35, 8, 1);
            font-weight: bold;
          }

          .searchTools {
            margin-top: 20px;
            width: 620px;
            display: inline-block;
            vertical-align: bottom;
          }

          .searchToolOptions {
            font-size: 13px;
            margin-top: 30px;
          }

          .left {
            float: left;
            margin-right: 10px;
            margin-left: 0;
          }

          .right {
            float: right;
            margin-right: 0;
            margin-left: 10px;
          }

          .searchToolOptions li {
            padding: 10px;
          }

          .active {
            font-weight: bold;
            border-bottom: 3px solid rgb(208, 35, 8, 1);
          }

          .active a {
            color: rgb(208, 35, 8, 1) !important;
          }

          .searchResults {
            margin-left: 162px;
            width: 620px;
            display: inline-block;
          }

          .result {
            margin: 20px 0 20px 5px;
          }

          .numberOfResults {
            margin-top: 15px;
            color: rgb(150, 150, 150);
          }

          .result p {
            margin: 3px 0 25px 0;
            color: #545454;
            line-height: 1.5em;
          }

          table {
            margin: 0;
            text-align: center;
            letter-spacing: -0.12em;
            font-size: 2.3em;
            margin-bottom: 20px;
            font-weight: bold;
          }

          .pageNumber {
            font-size: 12px;
            color: rgb(208, 35, 8, 1);
            letter-spacing: normal;
            text-align: center;
          }

          .red {
            color: rgb(218, 63, 63);
          }

          .footer {
            position: absolute;
            background: #f2f2f2;
            width: 100%;
            padding: 10px;
            border-top: 1px solid rgb(209, 209, 209);
          }

          .footer p,
          .footer ul {
            margin-left: 162px;
          }

          .footer p {
            margin-bottom: 20px;
          }

          .footer li {
            margin-right: 20px;
          }
        `}
      </style>
      <div>
        <div className="topContainer">
          <a href="/">
            <img src="/assets/images/psychology-ga23f2e239_1920.png" alt={'psychology'} />
          </a>
          <ul className="accountOptions">
            <li>
              <a href="#">
                <i className="fas fa-th" />
              </a>
            </li>
            <li>
              <button
                className="signIn"
                type="button"
                name="button"
                onClick={() => router.back()}
              >
                Voltar
              </button>
            </li>
          </ul>
          <div className="searchTools">
            <div className="form">
              <FormSearch
                setTerm={setTerm}
                term={term}
                setState={setState} />
            </div>
            <ul className="searchToolOptions">
              <li className="left active">
                <a href="#results:void()">Resultados</a>
              </li>
              {LINKS_LIST.map((link, index) =>
                index > 1 ? (
                  <li className="right" key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ) : (
                  <li className="left" key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div>
          {state === SearchState.None && <p>None</p>}
          {state === SearchState.Loading && <AjaxLoader style={{ marginLeft: '10%' }}/>}
          {state === SearchState.Error && <p>Error</p>}

          {state === SearchState.Success && results?.frases?.length !== 0 && (
            <>
              <div className="searchResults">
                {currentPage !== 10 ? (<>
                  <p className="numberOfResults">
                    Resultados da página {currentPage} de {results.total}
                  </p>
                </>):(<>
                  <p className="numberOfResults">
                    Aproximadamente {results.total} resultados {/* (0.48 seconds) */}
                  </p>
                </>)}
                {phrases?.map((frase: IPhrases, index: number) => (
                  <div className="result" key={index}>
                    <h2>{frase.texto}</h2>
                    <p>
                      <span>{frase.autor} - </span>
                      {frase.texto}
                    </p>
                  </div>
                ))}
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span className="red">P</span>
                      </td>
                      <td>
                        <span className="red">e</span>
                      </td>
                      <td>
                        <span className="red">n</span>
                      </td>
                      <td>
                        <span className="red">s</span>
                      </td>
                      <td>
                        <span className="red">a</span>
                      </td>
                      <td>
                        <span className="red">d</span>
                      </td>
                      <td>
                        <span className="red">o</span>
                      </td>
                      <td>
                        <span className="red">r</span>
                      </td>
                      <td rowSpan={2} style={{ width: 10 }} />
                      <td>
                        <span className="blue">
                          <i className="fas fa-angle-right" />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pageNumber" />
                      {[...Array(results.total / 10)].map((_, index) => (
                        <td className="pageNumber">
                          <a
                            href={`/search?term=${query.term}&page=${index + 1}`}
                            className="red"
                          >{index + 1}</a>
                        </td>
                      ))}
                      <td colSpan={3} />
                      <td className="pageNumber">
                        <a
                          href={`/search?term=${query.term}&page=${Number(query.page) + 1}`}
                          className="red"
                        >
                          Próxima
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="footer">
                <p>
                  <strong>
                    {city}, {region} - {country}
                  </strong>
                </p>
                <ul>
                  {LINKS_LIST.map((link, index) => (
                    <li className="left" key={index}>
                      <a href={link.url}>{link.name}</a>
                    </li>
                  ))}
                  <li className="right">
                    <a href={`/api/search?term=${query.term}`}>JSON result</a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
