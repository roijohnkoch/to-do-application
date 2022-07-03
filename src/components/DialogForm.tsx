import React, { useState } from 'react';
import { Dialog, Button, TextField, Autocomplete, Grid, Switch, Typography  } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createFilterOptions } from '@mui/material/Autocomplete';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useForm, Controller } from "react-hook-form";
import { ITaskItem } from '../types/types';
import { members } from '../__mocks__/mocks';
import moment from 'moment';

interface IDialogForm {
    isOpen: boolean;
    handleClose: () => void;
    selectedTask: ITaskItem | null;
    toDoItems: ITaskItem[];
    setToDoItems: React.Dispatch<React.SetStateAction<ITaskItem[]>>;
    doneItems: ITaskItem[];
    setDoneItems: React.Dispatch<React.SetStateAction<ITaskItem[]>>;
    setSelectedTask: React.Dispatch<React.SetStateAction<ITaskItem | null>>;
}

interface IMemberOption {
    inputValue?: string;
    member: string;
}

const DialogForm: React.FC<IDialogForm> = ({
    isOpen = false,
    handleClose = () => {},
    selectedTask = null,
    toDoItems,
    setToDoItems,
    doneItems,
    setDoneItems,
    setSelectedTask
}) => {
    const defaultValues = {
        title: selectedTask ? selectedTask.title : '',
        description: selectedTask ? selectedTask.description : '',
        assignedTo: selectedTask ? selectedTask.assignedTo : '',
        dueDate: selectedTask ? selectedTask.dueDate : moment().format('MM-DD-YYYY'),
        status: selectedTask ? selectedTask.status : 'Open',
    }

    const {
        register,
        handleSubmit,
        resetField,
        control,
        setValue,
        clearErrors,
        setError,
    } = useForm({ defaultValues: defaultValues });

    const [membersList, setMembersList] = useState<IMemberOption[]>(members);
    const [statusLabel, setStatusLabel] = useState<string>(selectedTask ? selectedTask.status : 'Open');

    const filter = createFilterOptions<IMemberOption>();

    const onSubmit = (data: any) => {
        const { status } = data;
        const taskId = `task-id-${Math.floor(Math.random() * 1000)}`;
        const arrayTodo = toDoItems.map((el) => el)
        const arrayDone = doneItems.map((el) => el)

        if (selectedTask) {
            // Edit
            if (selectedTask.status === data.status) { // Implemenation for editing items in same status
                switch (data.status) {
                    case 'Open': {
                        const selectedTaskIndex = arrayTodo.findIndex((task) => task.id === selectedTask.id);
                        arrayTodo[selectedTaskIndex] = {
                            ...data,
                            id: selectedTask.id,
                        }
                        setToDoItems(arrayTodo);
                    }
                        break;
                    case 'Close': {
                        const selectedTaskIndex = arrayDone.findIndex((task) => task.id === selectedTask.id);
                        arrayDone[selectedTaskIndex] = {
                            ...data,
                            id: selectedTask.id,
                        }
                        setDoneItems(arrayDone);
                    }
                        break;
                    default:
                        break;
                }
            } else { // Implementation for editing items that changes status
                switch (data.status) {
                    case 'Open': {
                        const selectedTaskIndex = arrayDone.findIndex((task) => task.id === selectedTask.id);
                        arrayDone.splice(selectedTaskIndex, 1);
                        arrayTodo.splice(arrayTodo.length, 0, { ...data, id: selectedTask.id, status: 'Open' });
                        setToDoItems(arrayTodo);
                        setDoneItems(arrayDone);
                    }
                        break;
                    case 'Close': {
                        const selectedTaskIndex = arrayTodo.findIndex((task) => task.id === selectedTask.id);
                        arrayTodo.splice(selectedTaskIndex, 1);
                        arrayDone.splice(arrayDone.length, 0, { ...data, id: selectedTask.id, status: 'Close' });
                        setToDoItems(arrayTodo);
                        setDoneItems(arrayDone);
                    }
                        break;
                
                    default:
                        break;
                }
            }
        } else {
            // Add task
            if (status === 'Open') {
                arrayTodo.push({ ...data, id: taskId });
                setToDoItems(arrayTodo);
            } else {
                arrayDone.push({ ...data, id: taskId });
                setDoneItems(arrayDone);
            }
        }
        handleOnclose();
    };

    const handleOnclose = () => {
        handleClose();
        resetField('title');
        resetField('description');
        resetField('assignedTo');
        resetField('dueDate');
        setSelectedTask(null);
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setStatusLabel(checked ? 'Open' : 'Close')
        setValue('status', checked ? 'Open' : 'Close');
    };
    
    return (
        <Dialog
            open={isOpen}
            onClose={handleOnclose}
            fullWidth
            maxWidth='xs'
        >
            <DialogTitle>{selectedTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Controller
                        name='title'
                        control={control}
                        render={({
                            field: { value },
                            formState: { errors }
                        }) => (
                            <TextField
                                value={value}
                                label='Title'
                                variant='outlined'
                                error={errors.hasOwnProperty('title')}
                                fullWidth
                                {...register('title', { required: true, maxLength: 80,  })}
                                helperText={errors.hasOwnProperty('title') && 'Title field is required'}
                                style={{ marginBottom: 12 }}
                            />
                        )}
                    />
                    <Controller
                        name='description'
                        control={control}
                        render={({
                            field: { value },
                            formState: { errors }
                        }) => (
                            <TextField
                                value={value}
                                label='Description'
                                multiline
                                rows={2}
                                error={errors.hasOwnProperty('description')}
                                fullWidth
                                {...register('description', { maxLength: 10 })}
                                helperText={errors.hasOwnProperty('description') && 'You can not use more than 10 characters'}
                                style={{ marginBottom: 12 }}
                            />
                        )}
                    />
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Controller
                                name='assignedTo'
                                control={control}
                                render={({
                                    field: { value },
                                    formState: { errors }
                                }) => (
                                    <Autocomplete
                                        value={value}
                                        onChange={(event, newValue) => {
                                            if (newValue && typeof newValue === 'object') {
                                                if (newValue.inputValue) {
                                                    clearErrors('assignedTo');
                                                    const newMemberList = membersList.map((el) => el);
                                                    const newMember = {
                                                        member: newValue.inputValue,
                                                    };
                                                    newMemberList.push(newMember)
                                                    setMembersList(newMemberList);
                                                } else {
                                                    clearErrors('assignedTo');
                                                    setValue('assignedTo', newValue.member);
                                                }
                                            } else {
                                                setError('assignedTo', { type: 'custom' })
                                                setValue('assignedTo', '');
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            const filtered = filter(options, params);
                                            const { inputValue } = params;
                                            const isExisting = options.some((option) => inputValue === option.member);
                                            if (params.inputValue !== '' && !isExisting) {
                                                filtered.push({
                                                inputValue: params.inputValue,
                                                    member: `Add "${params.inputValue}"`,
                                                });
                                            }
                                            return filtered;
                                        }}
                                        id="free-solo-dialog-demo"
                                        options={membersList}
                                        getOptionLabel={(option) => {
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            if (option.inputValue) {
                                                return option.inputValue;
                                            }
                                            return option.member;
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        renderOption={(props, option) => <li {...props}>{option.member}</li>}
                                        sx={{ width: 'auto' }}
                                        freeSolo
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Assigned to"
                                                {...register('assignedTo', { required: true })}
                                                error={errors.hasOwnProperty('assignedTo')}
                                                helperText={errors.hasOwnProperty('assignedTo') && 'This field is required.'}
                                                style={{ marginRight: 6 }}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name='dueDate'
                                control={control}
                                render={({
                                    field: { value },
                                    formState: { errors }
                                }) => (
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            disablePast
                                            label="Due date"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            value={value}
                                            onChange={(newValue) => {
                                                if(newValue) {
                                                    setValue('dueDate', moment(newValue).format('MM-DD-YYYY'));
                                                }
                                            }}
                                            onError={(reason) => {
                                                if (reason) {
                                                    setError('dueDate', { type: 'custom', message: 'Invalid date' })
                                                } else {
                                                    clearErrors('dueDate')
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={errors.hasOwnProperty('dueDate')}
                                                    helperText={errors.hasOwnProperty('dueDate') && errors.dueDate?.message}
                                                    style={{ marginLeft: 6 }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <Controller
                                name='status'
                                control={control}
                                render={({
                                    field: { value }
                                }) => (
                                    <Switch
                                        checked={value === 'Open' ? true : false}
                                        color='success'
                                        onChange={handleStatusChange}
                                    />
                                )}
                            />
                            <Typography>{statusLabel}</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnclose} color='info'>Cancel</Button>
                    <Button type='submit' color='info'>{selectedTask ? 'Save' : 'Add'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogForm;
