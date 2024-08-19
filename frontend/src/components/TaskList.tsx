import React from 'react';
import Task from './Task';
import { TaskData } from '@/lib/types';

import { useQuery, gql } from '@apollo/client';

const GET_TASKS_QUERY = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

const handleToggleTask = (id: string, completed: boolean) => {
  // Implementation for toggling task
};

const handleDeleteTask = (id: string) => {
  // Implementation for deleting task
};

const TaskList: React.FC = () => {
  /*
  const data = {
    tasks: [
      {
        id: 'task-id-1',
        title: 'Prisma gives you a powerful database toolkit 😎',
        completed: false
      },
      {
        id: 'task-id-2',
        title: 'The best GraphQL client',
        completed: false
      }
    ]
  };
  */

  const { loading, error, data } = useQuery<{ tasks: TaskData[] }>(GET_TASKS_QUERY);

  return (
    <>
      <div>
        <ul>
          {data && data.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TaskList;
