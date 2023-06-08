import React, { Dispatch, SetStateAction } from 'react';

interface loggingProps {
  isLogging: boolean;
  setIsLogging: Dispatch<SetStateAction<loggingProps['isLogging']>>;
}

const LoginContext = React.createContext<loggingProps>({
  isLogging: false,
  setIsLogging: () => {},
});

export default LoginContext;
