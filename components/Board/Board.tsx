import React, { useContext, useState } from 'react';
import { IconCircle, IconCircle0Filled, IconCircleFilled, IconDots } from '@tabler/icons-react';
import Card from '../Card/Card';
import Dropdown from '../Dropdown/Dropdown';
import CustomInput from '../CustomInput/CustomInput';
import classes from './Board.module.css';

import { IBoard, ICard } from '@/Interfaces/Kanban';
import clsx from 'clsx';
import { db } from '@/services/appwriteConfig';
import { uniqueId } from '@/utils/constants/uniqueId';
import { UserDataContext } from '@/context';
import { ActionIcon } from '@mantine/core';
import { config } from '@/services/config';

interface BoardProps {
  board: IBoard;
  onDragEnd: (boardId: string, cardId: string) => void;
  onDragEnter: (boardId: string, cardId: string) => void;
}

function Board(props: BoardProps) {
  const { board, onDragEnd, onDragEnter,
    } = props;
  const { userData } = useContext(UserDataContext);

  const addCardHandler = (boardId: string, value: string) => {
    const id = uniqueId();
    db.createDocument(config.NEXT_PUBLIC_DATABASE_ID, config.NEXT_PUBLIC_TASK_COLLECTION_ID, id, {
      userId: userData.userId,
      taskType: boardId,
      assignedDate: new Date(Date.now()),
      title: value,
    })
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div className={classes.board}>
      <div className={classes.board_inner} key={board?.id}>
        <div className={classes.board_header}>
          <div className={classes.board_details}>
            <ActionIcon size="xs" color={board.color}>
              <IconCircleFilled />
            </ActionIcon>
            <p className={classes.board_header_title}>
              {board?.title}
                <span>{board?.cards?.length || 0}</span>
            </p>
          </div>
        </div>
        <div className={clsx(classes.board_cards, classes.custom_scroll)}>
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass={classes.board_add_card}
            editClass={classes.board_add_card_edit}
            onSubmit={(value: string) => addCardHandler(board?.id, value)}
          />

          {board?.cards?.map((item: any) => (
            <Card
              key={item.$id}
              card={item}
              boardId={board.id}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
