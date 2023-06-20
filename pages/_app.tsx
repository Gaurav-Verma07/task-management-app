import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/typography.css';
import { Layout } from '@/components';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account, db } from '@/services/appwriteConfig';
import { ModalContext, UserDataContext } from '@/context';
import CardContext from '@/context/cardContext';
import { config } from '@/services/config';

const App = ({ Component, pageProps }: AppProps) => {
  const [isModal, setIsModal] = useState({
    isOpen: false,
    isLogging: false,
    isCard: false,
  });
  const [userData, setUserData] = useState({
    userId: '',
    username: '',
    email: '',
    color: '',
    isLoggedIn: false,
    isPic: false,
  });
  const [cardId, setCardId] = useState('');

  useEffect(() => {
    account
      .getSession('current')
      .then((res) => {})
      .catch((err) => console.log({ err }));
    account
      .get()
      .then((res) => {
        const userId = res.$id;
        db.getDocument(config.NEXT_PUBLIC_DATABASE_ID, config.NEXT_PUBLIC_USERDATA_COLLECTION_ID, userId)
          .then((res) => {
            const { userId, username, email, color, isPic } = res;
            setUserData({
              userId,
              username,
              email,
              color,
              isLoggedIn: true,
              isPic,
            });
          })
          .catch((err) => {});
      })
      .catch((err) => {});
    // }
  }, []);

  return (
    <>
      <CardContext.Provider value={{ cardId, setCardId }}>
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <ModalContext.Provider value={{ isModal, setIsModal }}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </ModalContext.Provider>
        </UserDataContext.Provider>
      </CardContext.Provider>
    </>
  );
};

export default App;
