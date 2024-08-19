import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { CreateTaskFormState } from '@/lib/types';

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      completed
    }
  }
`;

const CreateLink: React.FC = () => {
  const [formState, setFormState] = useState<CreateTaskFormState>({
    title: ''
  });

  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK_MUTATION);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createTask({
        variables: {
          input: {
            title: formState.title
          }
        }
      });
      console.log('Task created:', result.data.createTask);
      console.log('Create Task Form submitted:', formState);
      setFormState({ title: '' }); // Reset form after successful submission
    } catch (e) {
      console.error('Error creating task:', e);
    }
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