export interface ITags {
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
  tags: ITags[];
  date: string;
  tasks: ITask[];
  desc?: string;
}

export interface IBoard {
  id: string;
  title: string;
  color: string;
  cards: any;
}
