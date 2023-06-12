export interface ILabel {
  color: string;
  text: string;
}

export interface ITask {
  id: number;
  completed: boolean;
  text: string;
}

export interface ICard {
  $id: string;
  title: string;
  labels: ILabel[];
  date: string;
  tasks: ITask[];
  desc?: string;
}

export interface IBoard {
  id: string;
  title: string;
  cards: any;
}
