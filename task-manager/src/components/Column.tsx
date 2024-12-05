import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import DraggableTask from './DraggableTask'; // Use DraggableTask for drag functionality
import { Column as ColumnType } from '../types';

interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
  onDeleteTask: (columnId: string, taskId: string) => void;
  onEditTask: (columnId: string, taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, onAddTask, onDeleteTask, onEditTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const style = {
    backgroundColor: isOver ? '#e0f7fa' : 'white', // Highlight when dragged over
  };

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <h2>{column.name}</h2>
      <div>
        {column.tasks.map((task) => (
          <DraggableTask
            key={task.id}
            task={task}
            columnId={column.id}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))}
      </div>
      <button onClick={() => onAddTask(column.id)}>Add Task</button>
    </div>
  );
};

export default Column;
