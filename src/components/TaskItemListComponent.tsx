import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ITaskItem } from '../types/types';
import TaskItemComponent from './TaskItemComponent';

const TaskItemListComponent: React.FC<{
    droppableId: string;
    items: ITaskItem[];
    setSelectedTask: React.Dispatch<React.SetStateAction<ITaskItem | null>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    droppableId,
    items,
    setSelectedTask,
    setIsModalOpen,
}) => {
    return (
        <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {items.map((task, index) => (
                    <TaskItemComponent
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                        item={task}
                        setSelectedTask={setSelectedTask}
                        setIsModalOpen={setIsModalOpen}
                    />
                ))}
                {provided.placeholder}
            </div>
        )}
        </Droppable>
    );

};

export default TaskItemListComponent;
