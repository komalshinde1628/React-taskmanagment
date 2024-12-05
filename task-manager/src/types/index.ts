export interface Task {
    id: string;
    title: string;
  }
  
  export interface Column {
    id: string;
    name: string;
    tasks: Task[];
  }
  