import React, { useState } from 'react';
import { Paper, Grid, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskItemListComponent from './TaskItemListComponent';
import DialogForm from './DialogForm';
import { toDoList, taskDone, members } from '../__mocks__/mocks';
import { ITaskItem, IMemberOption } from '../types/types';

const LabelHeader = styled(Paper)({
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: '#f0f0f5',
    fontWeight: 'bold',
    display: 'flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
});

const Container: React.FC = () => {
    const [toDoItems, setToDoItems] = useState<ITaskItem[]>(toDoList);
    const [doneItems, setDoneItems] = useState<ITaskItem[]>(taskDone);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<ITaskItem | null>(null);
    const [membersList, setMembersList] = useState<IMemberOption[]>(members);

    const onDragEnd = ({ destination, source }: DropResult) => {
        if(!destination) return;
        if(destination.droppableId === source.droppableId) {
            switch (source.droppableId) {
                case 'task-to-do':
                    const newToDoList = Array.from(toDoItems);
                    const [removeToDo] = newToDoList.splice(source.index, 1);
                    newToDoList.splice(destination.index, 0, removeToDo)
                    setToDoItems(newToDoList);
                    break;
                case 'task-done':
                    const newTaskDonelist = Array.from(doneItems);
                    const [remove] = newTaskDonelist.splice(source.index, 1);
                    newTaskDonelist.splice(destination.index, 0, remove)
                    setDoneItems(newTaskDonelist);
                    break;
                default:
                    break;
            }
        } else {
            switch (destination.droppableId) {
                case 'task-to-do': {
                    const sourceList = Array.from(doneItems);
                    const destinationList = Array.from(toDoItems);
                    const [removedDone] = sourceList.splice(source.index, 1);
                    destinationList.splice(destination.index, 0, { ...removedDone, status: 'Open' });
                    setToDoItems(destinationList);
                    setDoneItems(sourceList);
                }
                    break;
                case 'task-done': {
                    const sourceList = Array.from(toDoItems);
                    const destinationList = Array.from(doneItems);
                    const [removedToDo] = sourceList.splice(source.index, 1);
                    destinationList.splice(destination.index, 0, { ...removedToDo, status: 'Close' });
                    setToDoItems(sourceList);
                    setDoneItems(destinationList);
                }
                    break;
                default:
                    break;
            }
        }
    };
    const handleClickAddTask = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Grid
            container
            spacing={0}
            style={{ maxHeight: '60%', width: '80%', margin: 'auto' }}
        >  
            {isModalOpen && (
                <DialogForm
                    isOpen={isModalOpen}
                    handleClose={handleClose}
                    toDoItems={toDoItems}
                    doneItems={doneItems}
                    setToDoItems={setToDoItems}
                    setDoneItems={setDoneItems}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    membersList={membersList}
                    setMembersList={setMembersList}
                />
            )}
            <Grid item xs={12}>
                <Paper 
                    elevation={0}
                    style={{
                        textAlign: 'center',
                        padding: 24,
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    To Do List
                    <Button
                        variant='contained'
                        color='success'
                        size='small'
                        startIcon={<AddIcon />}
                        onClick={handleClickAddTask}
                        style={{ marginLeft: 24 }}
                    >
                        <Typography fontSize={12}>Add Task</Typography>
                    </Button>
                </Paper>
            </Grid>
            {/* <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    variant='contained'
                    color='success'
                    size='small'
                    startIcon={<AddIcon />}
                    onClick={handleClickAddTask}
                >
                    <Typography fontSize={12}>Add Task</Typography>
                </Button>
            </Grid> */}
            <Grid item xs={6} style={{ padding: '0 12px 0 12px' }}>
                <LabelHeader>TO DO</LabelHeader>
            </Grid>
            <Grid item xs={6} style={{ padding: '0 12px 0 12px' }}>
                <LabelHeader>DONE</LabelHeader>
            </Grid>
            <Grid item xs={12}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} style={{ padding: '0 12px 0 12px' }}>
                            <TaskItemListComponent
                                droppableId='task-to-do'
                                items={toDoItems}
                                setSelectedTask={setSelectedTask}
                                setIsModalOpen={setIsModalOpen}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ padding: '0 12px 0 12px' }}>
                            <TaskItemListComponent
                                droppableId='task-done'
                                items={doneItems}
                                setSelectedTask={setSelectedTask}
                                setIsModalOpen={setIsModalOpen}
                            />
                        </Grid>
                    </Grid>
                </DragDropContext>
            </Grid>
        </Grid>
    );
};

export default Container;
