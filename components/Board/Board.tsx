import React, { useState } from "react";
import {IconDots} from '@tabler/icons-react';
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";
import classes from './Board.module.css'

// import "./Board.css";
import { IBoard, ICard } from "@/Interfaces/Kanban";
import clsx from "clsx";

interface BoardProps {
  board: IBoard;
  addCard: (boardId: number, title: string) => void;
  removeBoard: (boardId: number) => void;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

function Board(props: BoardProps) {
  const {
    board,
    addCard,
    removeBoard,
    removeCard,
    onDragEnd,
    onDragEnter,
    updateCard,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className={classes.board}>
      <div className={classes.board_inner} key={board?.id}>
        <div className={classes.board_header}>
          <p className={classes.board_header_title}>
            {board?.title}
            <span>{board?.cards?.length || 0}</span>
          </p>
          <div
            className={classes.board_header_title_more}
            onClick={() => setShowDropdown(true)}
          >
            <IconDots />
            {showDropdown && (
              <Dropdown
                class={classes.board_dropdown}
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeBoard(board?.id)}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className={clsx(classes.board_cards,  classes.custom_scroll)}>
          {board?.cards?.map((item:any) => (
            <Card
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass={classes.board_add_card}
            editClass={classes.board_add_card_edit}
            onSubmit={(value: string) => addCard(board?.id, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
