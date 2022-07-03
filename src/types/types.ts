export interface ITaskItem {
    id: string,
    title: string,
    description: string,
    assignedTo: string,
    dueDate: string,
    status: string,
};

export interface IMemberOption {
    inputValue?: string;
    member: string;
}
