import React from 'react';
import { render, screen } from '@testing-library/react';

import PersonInfo from './PersonInfo';

const mockData = {
    id: '23',
    jobTitle: 'Dev',
    emailAddress: 'test@op.pl',
    firstNameLastName: 'Adam Kowalski',
}

const mockFunction = (id) => {
    console.log(id)
};

test('renders PersonInfo component', () => {
    render(<PersonInfo data={mockData} onCardClick={mockFunction}/>);

    expect(screen.getByText('Adam Kowalski')).toBeInTheDocument();
});

test('get proper className if selected', () => {
    const { container } = render(<PersonInfo data={mockData} onCardClick={mockFunction} selected/>);

    expect(container.firstChild).toHaveClass('person-info--selected');
});