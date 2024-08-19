import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { TaskData } from '@/lib/types';
import TaskList from './TaskList';
import CreateTask from './CreateTask';

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const App: React.FC = () => {
  return (
    <>
      <CreateTask />
      <TaskList />
    </>
  )

}

/*
const App: React.FC = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { loading, error, data } = useQuery<{ tasks: Task[] }>(GET_TASKS);

  const [createTask] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      const existingTasks = cache.readQuery<{ tasks: Task[] }>({ query: GET_TASKS });
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: [...existingTasks!.tasks, createTask] },
      });
    },
  });


  // const [createTask] = useMutation(CREATE_TASK, {
  //   refetchQueries: [{ query: GET_TASKS }],
  // });
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleCreateTask = () => {
    if (newTaskTitle.trim() !== '') {
      createTask({ variables: { input: { title: newTaskTitle } } });
      setNewTaskTitle('');
    }
  };

  const handleToggleTask = (id: string, completed: boolean) => {
    updateTask({ variables: { id, input: { completed: !completed } } });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask({ variables: { id } });
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
    </div>
  );
}
*/

export default App;