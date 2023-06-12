import React, { useEffect, useState } from "react";
import CustomInput from "../../CustomInput/CustomInput";
import { ICard, ILabel, ITask } from "../../../Interfaces/Kanban";
import Chip from "../../Common/Chip";
import { IconAlignBoxLeftBottom, IconCalendarEvent, IconList, IconSquareCheck, IconTag, IconTrash } from "@tabler/icons-react";
import classes from "./CardInfo.module.css";
import ModalBox from "@/components/Modal/Modal";

interface CardInfoProps {
  // onClose: () => void;
  card: ICard;
  boardId: string;
  updateCard: (boardId: string, cardId: string, card: ICard) => void;
}

export const colorsList = [
  "#a8193d",
  "#4fcc25",
  "#1ebffa",
  "#8da377",
  "#9975bd",
  "#cf61a1",
  "#240959",
];

function CardInfo(props: CardInfoProps) {
  const {  card, boardId, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState<ICard>({
    ...card,
  });

  console.log( 'card info', {card})

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const addLabel = (label: ILabel) => {
    const index = cardValues.labels.findIndex(
      (item) => item.text === label.text
    );
    if (index > -1) return; //if label text already exist then return

    setSelectedColor("");
    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels, label],
    });
  };

  const removeLabel = (label: ILabel) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.text !== label.text
    );

    setCardValues({
      ...cardValues,
      labels: tempLabels,
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
    const completed = cardValues.tasks?.filter((item) => item.completed)
      ?.length;
    return (completed / cardValues.tasks?.length) * 100;
  };

  const updateDate = (date: string) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.$id, cardValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues]);

  const calculatedPercent = calculatePercent();

  return (
    <ModalBox title='Card Info' >
      <div className={classes.cardinfo}>
        <div className={classes["cardinfo-box"]}>
          <div className={classes["cardinfo-box-title"]}>
            <IconAlignBoxLeftBottom />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className={classes["cardinfo-box"]}>
          <div className={classes["cardinfo-box-title"]}>
            <IconList />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className={classes["cardinfo-box"]}>
          <div className={classes["cardinfo-box-title"]}>
            <IconCalendarEvent />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={cardValues.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className={classes["cardinfo-box"]}>
          <div className={classes["cardinfo-box-title"]}>
            <IconTag />
            <p>Labels</p>
          </div>
          <div className={classes["cardinfo-box-labels"]}>
            {cardValues.labels?.map((item, index) => (
              <Chip key={index} item={item} removeLabel={removeLabel} />
            ))}
          </div>
          <ul>
            {colorsList.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={
                  selectedColor === item ? classes["li-active"] : ""
                }
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <CustomInput
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value: string) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>

        <div className={classes["cardinfo-box"]}>
          <div className={classes["cardinfo-box-title"]}>
            <IconSquareCheck />
            <p>Tasks</p>
          </div>
          <div className={classes["cardinfo-box-progress-bar"]}>
            <div
              className={classes["cardinfo-box-progress"]}
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor:
                  calculatedPercent === 100 ? "limegreen" : "",
              }}
            />
          </div>
          <div className={classes["cardinfo-box-task-list"]}>
            {cardValues.tasks?.map((item) => (
              <div
                key={item.id}
                className={classes["cardinfo-box-task-checkbox"]}
              >
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? classes.completed : ""}>
                  {item.text}
                </p>
                <IconTrash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <CustomInput
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          />
        </div>
      </div>
    </ModalBox>
  );
}

export default CardInfo;
