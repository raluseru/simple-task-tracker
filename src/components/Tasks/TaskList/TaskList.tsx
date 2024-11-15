import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useTaskContext } from "../../../context/TaskContext";
const TaskListContainer = styled.div`
display: flex;
flex-wrap: wrap;
background-color: #f4f4f4;
padding: 20px 0;
border-radius: 8px;
`;

const TaskList: React.FC = () => {
    const { filteredTasks, deleteTask, updateTask } = useTaskContext();
    return (
        <Droppable droppableId="taskList">
            {(provided) => (
                <TaskListContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {filteredTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Task
                                        task={task}
                                        updateTask={updateTask}
                                        deleteTask={deleteTask}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </TaskListContainer>
            )}
        </Droppable>
    );
};

export default TaskList;
