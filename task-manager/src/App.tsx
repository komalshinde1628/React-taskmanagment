import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { useLocalStorage } from './hooks/useLocalStorage';
import Column from './components/Column';
import { Column as ColumnType } from './types';
import './styles/index.css';

const initialColumns: ColumnType[] = [
  { id: 'todo', name: 'To-Do', tasks: [] },
  { id: 'in-progress', name: 'In Progress', tasks: [] },
  { id: 'done', name: 'Done', tasks: [] },
];

const App: React.FC = () => {
  const [columns, setColumns] = useLocalStorage<ColumnType[]>('columns', initialColumns);

  const addTask = (columnId: string) => {
    const title = prompt('Enter task title');
    if (title) {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? { ...col, tasks: [...col.tasks, { id: Date.now().toString(), title }] }
            : col
        )
      );
    }
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) } : col
      )
    );
  };

  const editTask = (columnId: string, taskId: string) => {
    const newTitle = prompt('Enter new task title');
    if (newTitle) {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? {
                ...col,
                tasks: col.tasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)),
              }
            : col
        )
      );
    }
  };

  const onDragEnd = ({ active, over }: any) => {
    if (!over) return;

    const { columnId: fromColumnId, taskId } = active.data.current;
    const { id: toColumnId } = over;

    if (fromColumnId !== toColumnId) {
      setColumns((prev) => {
        const fromColumn = prev.find((col) => col.id === fromColumnId);
        const toColumn = prev.find((col) => col.id === toColumnId);

        if (!fromColumn || !toColumn) return prev;

        const task = fromColumn.tasks.find((t) => t.id === taskId);
        if (!task) return prev;

        return prev.map((col) => {
          if (col.id === fromColumnId) {
            return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
          } else if (col.id === toColumnId) {
            return { ...col, tasks: [...col.tasks, task] };
          }
          return col;
        });
      });
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="app-container">
        
        <header className="header">
          <h1>Trello</h1>
        </header>

        
        <div className="main-layout">
          
          <aside className="sidebar">
            <ul>
              <li>Dashboard</li>
              <li>Boards</li>
              <li>Settings</li>
              <li>Help</li>
            </ul>
          </aside>

      <main className="main-content">
      <div className="app">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
          />
        ))}
      </div>
      </main>
        </div>
      </div>
    </DndContext>
  );
};

export default App;
