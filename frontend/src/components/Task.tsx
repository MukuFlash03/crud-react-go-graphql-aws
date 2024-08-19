import React from 'react';
import { TaskProps } from '@/lib/types';

const Task: React.FC<TaskProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div>
      <div>
        {task.title} ({task.completed ? 'Completed' : 'Not Completed'})
        <li>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id, task.completed)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      </div>
    </div>
  );
};

export default Task;
