import React from 'react';
import { render, screen } from '@testing-library/react';

import Container from '../Container';

const renderComponent = () => {
    return render(<Container />);
};

describe('Test Container component', () => {
    it('Should render To Do list application', () => {
        renderComponent();
        expect(screen.getByText('To Do List')).toBeInTheDocument();
    })
})
