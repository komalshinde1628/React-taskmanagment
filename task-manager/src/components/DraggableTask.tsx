import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../types';

interface DraggableTaskProps {
  task: Task;
  columnId: string;
  onDelete: (columnId: string, taskId: string) => void;
  onEdit: (columnId: string, taskId: string) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task, columnId, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { columnId, taskId: task.id },
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <span>{task.title}</span>
      <div>
        <button onClick={() => onEdit(columnId, task.id)}>Edit</button>
        <button onClick={() => onDelete(columnId, task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default DraggableTask;
