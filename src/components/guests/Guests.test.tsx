import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import Guests from './Guests';
import userEvent from '@testing-library/user-event'

test('should contain Guest component', () => {
    let sendFunction = jest.fn();
    const { getByText } = render(<Guests sendTheNumber={sendFunction} />)

    let moreGuestBtn = getByText(/fler gäster.../)

    fireEvent.click(moreGuestBtn)
});

test('if we have buttons in the document', () => {
    let sendFunction = jest.fn();

    const { container } = render(<Guests sendTheNumber={sendFunction} />);

    let allBtn = container.querySelectorAll('button');

    expect(allBtn).toBeInTheDocument;

})


test('When button is clicked, value is true', () => {
    let sendFunction = jest.fn();
    const { getByText } = render(<Guests sendTheNumber={sendFunction} />);
    let moreButton = getByText('fler gäster...');
    userEvent.click(moreButton)
    expect(moreButton).toBeTruthy();

});
