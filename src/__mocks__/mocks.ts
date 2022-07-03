import { memberRandomizer } from '../helpers/helpers';

export const members = [
    {
        member: 'Mark',
    },
    {
        member: 'John',
    },
    {
        member: 'Wilson',
    },
];

export const toDoList = [
    {
        id: 'To-do 1',
        title: 'To-do 1',
        description: 'Test description',
        assignedTo: memberRandomizer(members),
        dueDate: '08-05-2022',
        status: 'Open',
    },
    {
        id: 'To-do 2',
        title: 'To-do 2',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '08-10-2022',
        status: 'Open',
    },
    {
        id: 'To-do 3',
        title: 'To-do 3',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '08-15-2022',
        status: 'Open',
    },
    {
        id: 'To-do 4',
        title: 'To-do 4',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '08-20-2022',
        status: 'Open',
    },
    {
        id: 'To-do 5',
        title: 'To-do 5',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '09-05-2022',
        status: 'Open',
    },
];

export const taskDone = [
    {
        id: 'To-do 6',
        title: 'To-do 6',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '09-07-2022',
        status: 'Close',
    },
    {
        id: 'To-do 7',
        title: 'To-do 7',
        description: '',
        assignedTo: memberRandomizer(members),
        dueDate: '09-09-2022',
        status: 'Close',
    },
];
