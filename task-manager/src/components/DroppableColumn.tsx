// import { useDroppable } from '@dnd-kit/core';
// import { Column } from '../types';

// interface DroppableColumnProps {
//   column: Column;
//   isDraggingOver: boolean;
// }

// const DroppableColumn: React.FC<DroppableColumnProps> = ({ column, isDraggingOver }) => {
//   const { setNodeRef } = useDroppable({ id: column.id });

//   return (
//     <div
//       ref={setNodeRef}
//       className="column"
//       style={{ backgroundColor: isDraggingOver ? '#e0f7fa' : '#ffffff' }}
//     >
//       <h2>{column.name}</h2>
//       {/* Render tasks */}
//     </div>
//   );
// };
