import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CreateTaskFormState } from '@/lib/types';



const CreateLink: React.FC = () => {
  const [formState, setFormState] = useState<CreateTaskFormState>({
    title: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your submit logic here
    console.log('Create Task Form submitted:', formState);
  };

  return (
    <div>
      <form onSubmit={handleCreateTask}>
        <div>
          <input
            className="mb2"
            type="text"
            value={formState.title}
            // onChange={(e) => setNewTaskTitle(e.target.value)}
            onChange={handleChange}
            placeholder="New task title"
            name="title"
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default CreateLink;