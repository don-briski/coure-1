export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate: string; 
  priority: Priority;
  status: Status;
}
