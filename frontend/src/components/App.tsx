import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { TaskData } from '@/lib/types';
import TaskList from './TaskList';
import CreateTask from './CreateTask';

const App: React.FC = () => {
  return (
    <>
      <h1>Task Manager</h1>
      <CreateTask />
      <TaskList />
    </>
  )
    ;
}

export default App;