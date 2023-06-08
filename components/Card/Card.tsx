import React, { useContext, useState } from 'react';
import { ICard } from '../../Interfaces/Kanban';
import Chip from '../Common/Chip';
import Dropdown from '../Dropdown/Dropdown';
import classes from './Card.module.css';
import CardInfo from './CardInfo/CardInfo';
import { IconAlarm, IconAlignLeft, IconDots, IconSquareCheck } from '@tabler/icons-react';
import LoginContext from '@/context/loginContext';

interface CardProps {
  card: ICard;
  boardId: number;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

function Card(props: CardProps) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } = props;
  const { id, title, desc, date, tasks, labels } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const { setIsLogging, isLogging } = useContext(LoginContext);
  console.log('card',{card})

  return (
    <>
      {/* {isLogging && (
        <CardInfo onClose={() => setIsLogging(false)} card={card} boardId={boardId} updateCard={updateCard} />
      )} */}
      <div
        className={classes.card}
        key={card.id}
        draggable
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => setIsLogging(true)}
      >
        <div className={classes['card-top']}>
          <div className={classes['card-top-labels']}>
            {labels?.map((item, index) => (
              <Chip key={index} item={item} />
            ))}
          </div>
          <div
            className={classes['card-top-more']}
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <IconDots />
            {showDropdown && (
              <Dropdown class="board-dropdown" onClose={() => setShowDropdown(false)}>
                <p onClick={() => removeCard(boardId, id)}>Delete Card</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className={classes['card-title']}>{title}</div>
        <div>
          <p title={desc}>
            <IconAlignLeft />
          </p>
        </div>
        <div className={classes['card-footer']}>
          {date && (
            <p className={classes['card-footer-item']}>
              <IconAlarm className={classes['card-footer-icon']} />
              {date.toString()}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className={classes['card-footer-item']}>
              <IconSquareCheck className={classes['card-footer-icon']} />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
        {isLogging && (
          <CardInfo card={card} boardId={boardId} updateCard={updateCard} />
        )}
    </>
  );
}

export default Card;
