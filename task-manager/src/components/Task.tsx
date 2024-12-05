import React from 'react';
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit }) => {
  return (
    <div className="task">
      {task.title}
      <button onClick={() => onEdit(task.id)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
