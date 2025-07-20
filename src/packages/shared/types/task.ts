
export interface Task {
  id: string;
  userId: string;
  task: string;
  state: TaskState;
  createdAt: Date;
  index: number | null;
  tags: string[] | null;
  scheduledDate: Date;
}

export type TaskState = "checked" | "unchecked" | "archived"
