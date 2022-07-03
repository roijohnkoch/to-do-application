import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Draggable } from 'react-beautiful-dnd';
import { ITaskItem } from '../types/types';

interface ITaskItemComponent {
    item: ITaskItem;
    draggableId: string;
    index: number;
    setSelectedTask: React.Dispatch<React.SetStateAction<ITaskItem | null>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles({
    openItemStyle: {
        backgroundColor: '#ffffcc',
        border: '1px solid #f0f0f5',
        padding: 10,
    },
    closeItemStyle: {
        backgroundColor: '#ccffe6',
        border: '1px solid #f0f0f5',
        padding: 10,
    },
    draggingListItem: {
      background: 'rgb(235,235,235)'
    }
  });

const TaskItemComponent: React.FC<ITaskItemComponent> = ({
    item,
    draggableId,
    index,
    setSelectedTask,
    setIsModalOpen,
}) => {
    const classes = useStyles();
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? classes.draggingListItem : item.status === 'Open' ? 
                        classes.openItemStyle : classes.closeItemStyle
                    }
                    onClick={() => {
                        setSelectedTask(item);
                        setIsModalOpen(true);
                    }}
                >
                    <Typography variant='h5'>{item.title}</Typography>
                    <Typography variant='subtitle2'>Assigned to: {item.assignedTo}</Typography>
                    <Typography variant='subtitle2'>Due date: {item.dueDate}</Typography>
                    <Typography variant='subtitle2'>Status: {item.status}</Typography>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItemComponent;
