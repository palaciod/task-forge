export type Lane = {
  id: string;
  name: string;
  order: number;
};

export type Card = {
  id: string;
  title: string;
  description?: string;
  laneId: string;
  order: number;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
};

export type BoardSettings = {
  showDoneColumn: boolean;
  wipLimitEnabled: boolean;
  wipLimitPerUser: number;
  autoArchiveDone: boolean;
  autoArchiveAfterDays: number;
};

export type Board = {
  id: string;
  projectId: string;
  name: string;
  key: string;
  lanes: Lane[];
  cards: Card[];
  settings: BoardSettings;
  createdAt: string;
  updatedAt: string;
};
