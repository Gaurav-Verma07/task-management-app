import { BOARD_ID } from '@/enums/boardIds';
import { db } from '@/services/appwriteConfig';
import { config } from '@/services/config';
import { Card, Paper, Skeleton, Text } from '@mantine/core';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';

const Stats = () => {
  const userId = localStorage.getItem('userId');
  const [stats, setStats] = useState([
    { total: 0, color: 'yellow', shadow: 'rgba(255, 255, 0, 25%)', text: 'TASK' },
    { total: 0, color: 'teal', shadow: 'rgba(0, 128, 128, 25%)', text: 'DOING' },
    { total: 0, color: 'red', shadow: 'rgba(255, 0, 0, 25%)', text: 'REVIEW' },
    { total: 0, color: 'cyan', shadow: 'rgba(0, 255, 255, 25%)', text: 'COMPLETED' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

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
        setStats([
          { total: task.length, color: 'yellow', shadow: 'rgba(255, 255, 0, 25%)', text: 'TASK' },
          { total: doing.length, color: 'teal', shadow: 'rgba(0, 128, 128, 25%)', text: 'DOING' },
          { total: review.length, color: 'red', shadow: 'rgba(255, 0, 0, 25%)', text: 'REVIEW' },
          { total: completed.length, color: 'cyan', shadow: 'rgba(0, 255, 255, 25%)', text: 'COMPLETED' },
        ]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [userId]);

  return (
    <Paper
      sx={() => ({
        display: 'flex',
        justifyContent: 'space-around',
      })}
    >
      {stats.map((data, index) => (
        <Card
          key={index}
          sx={() => ({
            width: '190px',
            height: '130px',
            borderLeft: `3px solid ${data.color}`,
            borderRadius: '25px',
            boxShadow: `0px 4px 4px 0px  ${data.shadow}`,
            backgroundColor: data.shadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: '10px 20px',
            margin: '10px',
          })}
        >
          <Text color="#777">{data.text}</Text>
          <Skeleton visible={isLoading}>
            <Text size={'40px'} weight={300} >{data.total}</Text>
          </Skeleton>
        </Card>
      ))}
    </Paper>
  );
};
export default Stats;
