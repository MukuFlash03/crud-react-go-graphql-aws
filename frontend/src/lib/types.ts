export interface TaskData {
    id: string;
    title: string;
    completed: boolean;
}

export interface TaskProps {
    task: TaskData;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

/*
export interface TaskListProps {
    data: {
        tasks: TaskData[];
    } | null;
    handleToggleTask: (id: string, completed: boolean) => void;
    handleDeleteTask: (id: string) => void;
}
*/

export interface CreateTaskFormState {
    title: string;
}

export interface GetTasksData {
    tasks: TaskData[];
}

export interface CreateTaskInput {
    title: string;
}

export interface UpdateTaskInput {
    title?: string;
    completed?: boolean;
}