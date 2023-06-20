import React, { useEffect, useState } from 'react';
import classes from './Dashboard.module.css';
import { IBoard } from '@/Interfaces/Kanban';
import Board from '../Board';
import { client, db } from '@/services/appwriteConfig';
import { Query } from 'appwrite';
import { BOARD_ID } from '@/enums/boardIds';
import { config } from '@/services/config';

function Dashboard() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const userId = localStorage.getItem('userId');
  const [targetCard, setTargetCard] = useState({
    boardId: '',
    cardId: '',
  });

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
        color: 'yellow',
        cards: prev[0].cards.concat(task),
      },
      {
        id: BOARD_ID.DOING,
        title: BOARD_ID.DOING,
        color: 'teal',
        cards: prev[1].cards.concat(doing),
      },
      {
        id: BOARD_ID.REVIEW,
        title: BOARD_ID.REVIEW,
        color: 'red',
        cards: prev[2].cards.concat(review),
      },
      {
        id: BOARD_ID.COMPLETED,
        title: BOARD_ID.COMPLETED,
        color: 'cyan',
        cards: prev[3].cards.concat(completed),
      },
    ]);
  };

  useEffect(() => {
    db.listDocuments(config.NEXT_PUBLIC_DATABASE_ID, config.NEXT_PUBLIC_TASK_COLLECTION_ID, [
      Query.equal('userId', `${userId}`),
    ])
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
            color: 'yellow',
            cards: task,
          },
          {
            id: BOARD_ID.DOING,
            title: BOARD_ID.DOING,
            color: 'teal',
            cards: doing,
          },
          {
            id: BOARD_ID.REVIEW,
            title: BOARD_ID.REVIEW,
            color: 'red',
            cards: review,
          },
          {
            id: BOARD_ID.COMPLETED,
            title: BOARD_ID.COMPLETED,
            color: 'cyan',
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
      [`databases.${config.NEXT_PUBLIC_DATABASE_ID}.collections.${config.NEXT_PUBLIC_TASK_COLLECTION_ID}.documents`],
      (data) => {
        if (
          data.events.includes(
            `databases.${config.NEXT_PUBLIC_DATABASE_ID}.collections.${config.NEXT_PUBLIC_TASK_COLLECTION_ID}.documents.*.create`,
          )
        ) {
          setBoardHandler([data.payload]);
        }
      },
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const onDragEnd = (boardId: string, cardId: string) => {
    const sourceBoardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex((item: any) => item.$id === cardId);
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex((item: IBoard) => item.id === targetCard.boardId);
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex((item: any) => item.$id === targetCard.cardId);
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    console.log({ sourceCard, boardINd: boards[targetBoardIndex].id });
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(targetCardIndex, 0, sourceCard);
    setBoards(tempBoardsList);
    db.updateDocument(config.NEXT_PUBLIC_DATABASE_ID, config.NEXT_PUBLIC_TASK_COLLECTION_ID, cardId, {
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
            <Board key={item.id} board={item} onDragEnd={onDragEnd} onDragEnter={onDragEnter} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
