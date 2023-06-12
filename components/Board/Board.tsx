import React, { useContext, useState } from 'react';
import { IconDots } from '@tabler/icons-react';
import Card from '../Card/Card';
import Dropdown from '../Dropdown/Dropdown';
import CustomInput from '../CustomInput/CustomInput';
import classes from './Board.module.css';

// import "./Board.css";
import { IBoard, ICard } from '@/Interfaces/Kanban';
import clsx from 'clsx';
import { db } from '@/services/appwriteConfig';
import { uniqueId } from '@/utils/constants/uniqueId';
import { UserDataContext } from '@/context';

interface BoardProps {
  board: IBoard;
  removeBoard: (boardId: string) => void;
  removeCard: (boardId: string, cardId: string) => void;
  onDragEnd: (boardId: string, cardId: string) => void;
  onDragEnter: (boardId: string, cardId: string) => void;
  updateCard: (boardId: string, cardId: string, card: ICard) => void;
}

function Board(props: BoardProps) {
  const { board, removeBoard, removeCard, onDragEnd, onDragEnter, updateCard } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const { userData } = useContext(UserDataContext);

  const addCardHandler = (boardId: string, value: string) => {
    const id = uniqueId();
    db.createDocument('6481cad1448109f73920', '64844263188c2cafbebb', id, {
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
          <p className={classes.board_header_title}>
            {board?.title}
            <span>{board?.cards?.length || 0}</span>
          </p>
          <div className={classes.board_header_title_more} onClick={() => setShowDropdown(true)}>
            <IconDots />
            {showDropdown && (
              <Dropdown class={classes.board_dropdown} onClose={() => setShowDropdown(false)}>
                <p onClick={() => removeBoard(board?.id)}>Delete Board</p>
              </Dropdown>
            )}
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
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
