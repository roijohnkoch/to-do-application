import { memberRandomizer } from '../helpers/helpers';

export const members = [
    'Mark',
    'John',
    'Wilson',
];

export const toDoList = [
    {
        id: 'To-do 1',
        title: 'To-do 1',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '',
        status: 'open',
    },
    {
        id: 'To-do 2',
        title: 'To-do 2',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '',
        status: 'open',
    },
    {
        id: 'To-do 3',
        title: 'To-do 3',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '',
        status: 'open',
    },
    {
        id: 'To-do 4',
        title: 'To-do 4',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '',
        status: 'open',
    },
    {
        id: 'To-do 5',
        title: 'To-do 5',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '',
        status: 'open',
    },
];

export const taskDone = [
    {
        id: 'To-do 6',
        title: 'To-do 6',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '',
        status: 'close',
    },
    {
        id: 'To-do 7',
        title: 'To-do 7',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '',
        status: 'close',
    },
];
