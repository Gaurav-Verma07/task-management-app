import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/typography.css';
import { Layout } from '@/components';
import LoginContext from '@/context/loginContext';
import { useState } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  const [isLogging, setIsLogging] = useState(false);

  return (
    <>
      <LoginContext.Provider value={{ isLogging, setIsLogging }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoginContext.Provider>
    </>
  );
};

export default App;
