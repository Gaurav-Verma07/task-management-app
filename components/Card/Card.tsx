import React, { useContext, useState } from 'react';
import { ICard } from '../../Interfaces/Kanban';
import Dropdown from '../Dropdown/Dropdown';
import classes from './Card.module.css';
import CardInfo from './CardInfo/CardInfo';
import { IconAlarm, IconAlignLeft, IconDots, IconSquareCheck } from '@tabler/icons-react';
import { ModalContext } from '@/context';
import { Chip } from '@mantine/core';
import CardContext from '@/context/cardContext';

interface CardProps {
  card: ICard;
  boardId: string;
  onDragEnd: (boardId: string, cardId: string) => void;
  onDragEnter: (boardId: string, cardId: string) => void;
}

function Card(props: CardProps) {
  const { card, boardId, onDragEnd, onDragEnter } = props;
  const { $id, title, desc, date, tasks, tags } = card;
  const { isModal, setIsModal } = useContext(ModalContext);
  const { cardId, setCardId } = useContext(CardContext);

  return (
    <section>
      <div
        className={classes.card}
        key={card.$id}
        draggable
        onDragEnd={() => {
          onDragEnd(boardId, $id);
        }}
        onDragEnter={() => onDragEnter(boardId, $id)}
        onClick={(e) => {
          setCardId($id);
          setIsModal((prev) => ({
            ...prev,
            isCard: true,
          }));
        }}
      >
        <div className={classes['card-top']}>
          <div className={classes['card-top-labels']}>
            {tags?.map((item, index) => (
              <Chip key={index} color={item.color}>
                {item.text}
              </Chip>
            ))}
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
      {isModal.isCard && <CardInfo />}
    </section>
  );
}

export default Card;
