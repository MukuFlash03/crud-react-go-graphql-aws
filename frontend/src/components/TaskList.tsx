import React from 'react';
import Task from './Task';
import { TaskData } from '@/lib/types';

import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TASKS_QUERY = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      completed
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

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

  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
  });

  const { loading, error, data } = useQuery<{ tasks: TaskData[] }>(GET_TASKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handleToggleTask = (id: string, completed: boolean) => {
    updateTask({ variables: { id, input: { completed: !completed } } });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask({ variables: { id } });
  }

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
