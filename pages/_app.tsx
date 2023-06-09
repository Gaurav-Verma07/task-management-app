import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/typography.css';
import { Layout } from '@/components';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account, db } from '@/services/appwriteConfig';
import { ModalContext, UserDataContext } from '@/context';

const App = ({ Component, pageProps }: AppProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    username: '',
    email: '',
    color: '',
    isLoggedIn: false,
    isPic: false,
  });

  useEffect(() => {
    account
      .get()
      .then((res) => {
        const userId = res.$id;
        console.log({ res });
        db.getDocument('6481cad1448109f73920', '6481cada40114c73e2c1', userId)
          .then((res) => {
            console.log({ res });
            const { userId, username, email, color, isPic } = res;
            setUserData({
              userId,
              username,
              email,
              color,
              isLoggedIn: true,
              isPic,
            });
            console.log({ userData });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log({ userData });

  return (
    <>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <ModalContext.Provider value={{ isOpen, setIsOpen }}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </ModalContext.Provider>
      </UserDataContext.Provider>
    </>
  );
};

export default App;
