import React, { useState } from 'react';
import { Dialog, Button, TextField, Autocomplete } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useForm, Controller } from "react-hook-form";
import { ITaskItem } from '../types/types';

interface IDialogForm {
    isOpen: boolean;
    handleClose: () => void;
    selectedTask?: ITaskItem
}

const DialogForm: React.FC<IDialogForm> = ({
    isOpen = false,
    handleClose = () => {},
    selectedTask,
}) => {

    const defaultValues = {
        title: selectedTask && selectedTask.title  || '',
        description: '',
        assignedTo: '',
    }

    const { register, handleSubmit, resetField, control } = useForm({ defaultValues: defaultValues });

    const onSubmit = (data: { title: string }) => {
        alert(JSON.stringify(data));
    };

    const handleOnclose = () => {
        handleClose();
        resetField('title');
        resetField('description');
    }
    
    return (
        <Dialog
            open={isOpen}
            onClose={handleOnclose}
            fullWidth
            maxWidth='xs'
        >
            <DialogTitle>Add New Task</DialogTitle>
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
                            />
                        )}
                    />
                    {/* <Controller
                        name='assignedTo'
                        control={control}
                        render={({ field: { value } }) => (
                            <Autocomplete
                                value={value}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                    setValue({
                                        title: newValue,
                                    });
                                    } else if (newValue && newValue.inputValue) {
                                    // Create a new value from the user input
                                    setValue({
                                        title: newValue.inputValue,
                                    });
                                    } else {
                                    setValue(newValue);
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);

                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some((option) => inputValue === option.title);
                                    if (inputValue !== '' && !isExisting) {
                                    filtered.push({
                                        inputValue,
                                        title: `Add "${inputValue}"`,
                                    });
                                    }

                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="free-solo-with-text-demo"
                                options={top100Films}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                    return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                    return option.inputValue;
                                    }
                                    // Regular option
                                    return option.title;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                sx={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Free solo with text demo" />
                                )}
                            />
                        )}
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnclose} color='info'>Cancel</Button>
                    <Button type='submit' color='info'>Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogForm;
