import { Column } from '../types';

export const reorderTasks = (columns: Column[], taskId: string, targetColumnId: string): Column[] => {
  const sourceColumn = columns.find((col) => col.tasks.some((t) => t.id === taskId));
  const targetColumn = columns.find((col) => col.id === targetColumnId);

  if (!sourceColumn || !targetColumn) return columns;

  const task = sourceColumn.tasks.find((t) => t.id === taskId)!;

  return columns.map((col) => {
    if (col === sourceColumn) {
      return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
    }
    if (col === targetColumn) {
      return { ...col, tasks: [...col.tasks, task] };
    }
    return col;
  });
};
