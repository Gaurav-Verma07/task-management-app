import React, { Dispatch, SetStateAction } from 'react';

interface modalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<modalProps['isOpen']>>;
}

const ModalContext = React.createContext<modalProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export default ModalContext;
