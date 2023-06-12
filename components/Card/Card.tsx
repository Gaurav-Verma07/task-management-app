import React, { useContext, useState } from 'react';
import { ICard } from '../../Interfaces/Kanban';
import Chip from '../Common/Chip';
import Dropdown from '../Dropdown/Dropdown';
import classes from './Card.module.css';
import CardInfo from './CardInfo/CardInfo';
import { IconAlarm, IconAlignLeft, IconDots, IconSquareCheck } from '@tabler/icons-react';
import { ModalContext } from '@/context';

interface CardProps {
  card: ICard;
  boardId: string;
  removeCard: (boardId: string, cardId: string) => void;
  onDragEnd: (boardId: string, cardId: string) => void;
  onDragEnter: (boardId: string, cardId: string) => void;
  updateCard: (boardId: string, cardId: string, card: ICard) => void;
}

function Card(props: CardProps) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } = props;
  console.log({ card });
  const { $id, title, desc, date, tasks, labels } = card;
  console.log({ boardId, $id });
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const { setIsOpen, isOpen } = useContext(ModalContext);

  return (
    <>
      {/* {isOpen && (
        <CardInfo onClose={() => setIsOpen(false)} card={card} boardId={boardId} updateCard={updateCard} />
      )} */}
      <div
        className={classes.card}
        key={card.$id}
        draggable
        onDragEnd={() => {
          console.log('drag end');
          onDragEnd(boardId, $id);
        }}
        onDragEnter={() => onDragEnter(boardId, $id)}
        onClick={() => setIsOpen(true)}
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
                <p onClick={() => removeCard(boardId, $id)}>Delete Card</p>
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
      {isOpen && <CardInfo card={card} boardId={boardId} updateCard={updateCard} />}
    </>
  );
}

export default Card;
