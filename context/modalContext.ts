import React, { Dispatch, SetStateAction } from 'react';

interface modalProps {
  isModal: { isOpen: boolean; isLogging: boolean; isCard: boolean };
  setIsModal: Dispatch<SetStateAction<modalProps['isModal']>>;
}

const ModalContext = React.createContext<modalProps>({
  isModal: { isOpen: false, isLogging: false, isCard: false },
  setIsModal: () => {},
});

export default ModalContext;
