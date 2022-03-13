import { AppProps } from 'next/app';

import '../styles/global.css';

import { DataProvider } from '@/shared/hooks/useData';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <DataProvider>
    <Component {...pageProps} />
  </DataProvider>
);

export default MyApp;
