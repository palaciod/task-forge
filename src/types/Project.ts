export type Sprint = {
  id: string;
  name: string;
  iteration: number;
};

export type Epic = {
  id: string;
  name: string;
  description?: string;

  /** Always belongs to a project */
  projectId: string;

  /** Assigned later (optional) */
  sprintId?: string;

  /** Ordering in the project backlog or sprint */
  order: number;
};



export type Project = {
  id: string;
  name: string;
  description: string;
  sprints: Sprint[];
  epics: Epic[];
};