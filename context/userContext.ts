import React, { Dispatch, SetStateAction } from 'react';

interface userProps {
  userId: string;
  username: string;
  email: string;
  color: string;
  isLoggedIn: boolean;
  isPic: boolean;
  avatar?:any
}

interface userDataProps {
  userData: userProps;
  setUserData: Dispatch<SetStateAction<userDataProps['userData']>>;
}

const UserDataContext = React.createContext<userDataProps>({
  userData: {
    userId: '',
    username: '',
    email: '',
    color: '',
    isLoggedIn: false,
    isPic: false,
    avatar:{}
  },
  setUserData: () => {},
});

export default UserDataContext;
