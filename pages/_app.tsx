import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/typography.css';
import { Layout } from '@/components';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // if (userData.isLoggedIn) {
    account
      .getSession('current')
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log({ err }));
    account
      .get()
      .then((res) => {
        const userId = res.$id;
        db.getDocument('6481cad1448109f73920', '6481cada40114c73e2c1', userId)
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
      {isLoading ? (
        <p>Loading ho rha hai bhai</p>
      ) : (
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <ModalContext.Provider value={{ isOpen, setIsOpen }}>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </ModalContext.Provider>
        </UserDataContext.Provider>
      )}
    </>
  );
};

export default App;
