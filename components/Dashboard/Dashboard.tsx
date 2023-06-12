import React, { useContext, useEffect, useState } from 'react';
import classes from './Dashboard.module.css';
import { IBoard, ICard } from '@/Interfaces/Kanban';
import Board from '../Board';
import { client, db } from '@/services/appwriteConfig';
import { Query } from 'appwrite';
import { BOARD_ID } from '@/enums/boardIds';

function Dashboard() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const userId = localStorage.getItem('userId');
  const [targetCard, setTargetCard] = useState({
    boardId: '',
    cardId: '',
  });

  const removeBoard = (boardId: string) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
  };

  const removeCard = (boardId: string, cardId: string) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item: any) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const setBoardHandler = (documents: any) => {
    const task = documents.filter((doc: any) => doc.taskType === BOARD_ID.TASK);
    const doing = documents.filter((doc: any) => doc.taskType === BOARD_ID.DOING);
    const review = documents.filter((doc: any) => doc.taskType === BOARD_ID.REVIEW);
    const completed = documents.filter((doc: any) => doc.taskType === BOARD_ID.COMPLETED);
    console.log({ documents, task, doing, review, completed });

    setBoards((prev) => [
      {
        id: BOARD_ID.TASK,
        title: BOARD_ID.TASK,
        cards: prev[0].cards.concat(task),
      },
      {
        id: BOARD_ID.DOING,
        title: BOARD_ID.DOING,
        cards: prev[1].cards.concat(doing),
      },
      {
        id: BOARD_ID.REVIEW,
        title: BOARD_ID.REVIEW,
        cards: prev[2].cards.concat(review),
      },
      {
        id: BOARD_ID.COMPLETED,
        title: BOARD_ID.COMPLETED,
        cards: prev[3].cards.concat(completed),
      },
    ]);
  };

  useEffect(() => {
    db.listDocuments('6481cad1448109f73920', '64844263188c2cafbebb', [Query.equal('userId', `${userId}`)])
      .then((res) => {
        const { documents } = res;
        const task = documents.filter((doc) => doc.taskType === BOARD_ID.TASK);
        const doing = documents.filter((doc) => doc.taskType === BOARD_ID.DOING);
        const review = documents.filter((doc) => doc.taskType === BOARD_ID.REVIEW);
        const completed = documents.filter((doc) => doc.taskType === BOARD_ID.COMPLETED);

        setBoards([
          {
            id: BOARD_ID.TASK,
            title: BOARD_ID.TASK,
            cards: task,
          },
          {
            id: BOARD_ID.DOING,
            title: BOARD_ID.DOING,
            cards: doing,
          },
          {
            id: BOARD_ID.REVIEW,
            title: BOARD_ID.REVIEW,
            cards: review,
          },
          {
            id: BOARD_ID.COMPLETED,
            title: BOARD_ID.COMPLETED,
            cards: completed,
          },
        ]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [`databases.6481cad1448109f73920.collections.64844263188c2cafbebb.documents`],
      (data) => {
        if (
          data.events.includes('databases.6481cad1448109f73920.collections.64844263188c2cafbebb.documents.*.create')
        ) {
          setBoardHandler([data.payload]);
          // setAllTodo((todo: any) => [...todo, data.payload]);
        }
      },
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const updateCard = (boardId: string, cardId: string, card: ICard) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item: any) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
  };

  const onDragEnd = (boardId: string, cardId: string) => {
    const sourceBoardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex((item: any) => item.$id === cardId);
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex((item: IBoard) => item.id === targetCard.boardId);
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex((item: any) => item.$id === targetCard.cardId);
    if (targetCardIndex < 0) return;

    // console.log({sourceBoardIndex})

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    console.log({ sourceCard, boardINd: boards[targetBoardIndex].id });
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(targetCardIndex, 0, sourceCard);
    setBoards(tempBoardsList);
    db.updateDocument('6481cad1448109f73920', '64844263188c2cafbebb', cardId, {
      taskType: boards[targetBoardIndex].id,
    })
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log({ err }));
    setTargetCard({
      boardId: '',
      cardId: '',
    });
  };

  const onDragEnter = (boardId: string, cardId: string) => {
    console.log('onDragEnter', { cardId });
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  return (
    <div>
      <div className={classes['app-boards-container']}>
        <div className={classes['app-boards']}>
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
