import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { TaskType } from "types";

const TaskListContainer = styled.div`
  margin-top: 20px;
`;

interface TaskListProps {
    tasks: TaskType[];
    updateTask: (id: number, newTitle: string, newDescription: string) => void;
    deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
    return (
        <TaskListContainer>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            ))}
        </TaskListContainer>
    );
};

export default TaskList;
