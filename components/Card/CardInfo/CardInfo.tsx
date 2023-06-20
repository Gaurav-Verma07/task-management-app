import React, { useContext, useEffect, useState } from 'react';
import CustomInput from '../../CustomInput/CustomInput';
import { ICard, ITags, ITask } from '../../../Interfaces/Kanban';
import {
  IconAlignBoxLeftBottom,
  IconCalendarEvent,
  IconList,
  IconSquareCheck,
  IconTag,
  IconTrash,
} from '@tabler/icons-react';
import classes from './CardInfo.module.css';
import ModalBox from '@/components/Modal/Modal';
import { Chip, Group, Progress, Skeleton, Text } from '@mantine/core';
import { colors } from '@/utils/constants/colors';
import { db } from '@/services/appwriteConfig';
import CardContext from '@/context/cardContext';
import { config } from '@/services/config';

function CardInfo() {
  const [selectedColor, setSelectedColor] = useState('');
  const [cardValues, setCardValues] = useState<ICard>({
    $id: '',
    title: '',
    tags: [],
    date: '',
    tasks: [],
    desc: '',
  });
  const { cardId } = useContext(CardContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.getDocument(config.NEXT_PUBLIC_DATABASE_ID, config.NEXT_PUBLIC_TASK_COLLECTION_ID, cardId)
      .then((res) => {
        setCardValues({
          $id: res.$id,
          title: res.title,
          tags: res.tags,
          date: res.assignedDate,
          tasks: res.tasks,
          desc: res.description,
        });
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(!isLoading);
      });
  }, []);

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const addLabel = (label: ITags) => {
    console.log({ label });
    if (!cardValues.tags) {
      setCardValues({
        ...cardValues,
        tags: [label],
      });
      return;
    }

    const index = cardValues.tags.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setCardValues({
      ...cardValues,
      tags: [...cardValues.tags, label],
    });
  };
  const removeLabel = (label: ITags) => {
    const tempTags = cardValues.tags?.filter((item) => item.text !== label.text);

    setCardValues({
      ...cardValues,
      tags: tempTags,
    });
  };

  const addTask = (value: string) => {
    const task: ITask = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks, task],
    });
  };

  const removeTask = (id: number) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({
      ...cardValues,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!cardValues.tasks?.length) return 0;
    const completed = cardValues.tasks?.filter((item) => item.completed)?.length;
    return (completed / cardValues.tasks?.length) * 100;
  };

  const updateDate = (date: string) => {
    if (!date) return;
    setCardValues({
      ...cardValues,
      date,
    });
  };

  const calculatedPercent = calculatePercent();

  useEffect(() => {
    db.updateDocument(config.NEXT_PUBLIC_DATABASE_ID, config.NEXT_PUBLIC_TASK_COLLECTION_ID, cardId, {
      title: cardValues.title,
      tags: cardValues.tags,
      assignedDate: cardValues.date,
      tasks: cardValues.tasks,
      description: cardValues.desc,
    }).catch((err) => {
      console.log(err);
    });
  }, [cardValues, cardId]);

  return (
    <ModalBox title="Card Info">
      <div className={classes.cardinfo}>
        <div className={classes['cardinfo-box']}>
          <div className={classes['cardinfo-box-title']}>
            <IconAlignBoxLeftBottom />
            <Text color="grey">Title</Text>
          </div>
          <Skeleton visible={isLoading}>
            <CustomInput
              defaultValue={cardValues.title}
              text={cardValues.title}
              placeholder="Enter Title"
              onSubmit={updateTitle}
            />
          </Skeleton>
        </div>

        <div className={classes['cardinfo-box']}>
          <div className={classes['cardinfo-box-title']}>
            <IconList />
            <Text color="grey">Description</Text>
          </div>
          <Skeleton visible={isLoading}>
            <CustomInput
              defaultValue={cardValues.desc}
              text={cardValues.desc || 'Add a Description'}
              placeholder="Enter description"
              onSubmit={updateDesc}
            />
          </Skeleton>
        </div>

        <div className={classes['cardinfo-box']}>
          <div className={classes['cardinfo-box-title']}>
            <IconCalendarEvent />
            <Text color="grey">Start Date</Text>
          </div>
          <Skeleton visible={isLoading}>
            <input
              type="date"
              defaultValue={cardValues.date}
              min={new Date().toISOString().substr(0, 10)}
              onChange={(event) => updateDate(event.target.value)}
            />
          </Skeleton>
        </div>

        <div className={classes['cardinfo-box']}>
          <div className={classes['cardinfo-box-title']}>
            <IconTag />
            <Text color="grey">Tags</Text>
          </div>
          <Skeleton visible={isLoading}>
            <Chip.Group>
              <Group>
                {cardValues.tags?.map((item, index) => (
                  <Chip
                    key={index}
                    value={item.text}
                    color={item.color}
                    variant="light"
                    onClick={(e) => {
                      console.log(e);
                    }}
                  >
                    {item.text}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Skeleton>
          <ul>
            {colors.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? classes['li-active'] : ''}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <CustomInput
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value: string) =>
              addLabel({
                color: selectedColor,
                text: value,
              })
            }
          />
        </div>

        <div className={classes['cardinfo-box']}>
          <div className={classes['cardinfo-box-title']}>
            <IconSquareCheck />
            <Text color="grey">Tasks</Text>
          </div>
          <Skeleton visible={isLoading}>
            <div className={classes['cardinfo-box-progress-bar']}>
              <Progress value={calculatedPercent} />
            </div>
          </Skeleton>
          <div className={classes['cardinfo-box-task-list']}>
            <Skeleton visible={isLoading}>
              {cardValues.tasks?.map((item) => (
                <div key={item.id} className={classes['cardinfo-box-task-checkbox']}>
                  <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    onChange={(event) => updateTask(item.id, event.target.checked)}
                  />
                  <Text className={item.completed ? classes.completed : ''}>{item.text}</Text>
                  <IconTrash className={classes.trashIcon} onClick={() => removeTask(item.id)} />
                </div>
              ))}
            </Skeleton>
          </div>
          <CustomInput text={'Add a Task'} placeholder="Enter task" onSubmit={addTask} />
        </div>
      </div>
    </ModalBox>
  );
}

export default CardInfo;
