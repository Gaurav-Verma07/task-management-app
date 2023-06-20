import React, { Dispatch, SetStateAction } from 'react';

interface cardProps {
  cardId: string;
  setCardId: Dispatch<SetStateAction<cardProps['cardId']>>;
}

const CardContext = React.createContext<cardProps>({
  cardId: '',
  setCardId: () => {},
});

export default CardContext;
