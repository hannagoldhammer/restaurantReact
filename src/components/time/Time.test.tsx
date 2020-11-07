import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Time from './Time';

test('should contain Time component', () => {
    let sendFunctionProps = jest.fn();

    const {getByText} = render(<Time sendTime={sendFunctionProps} />)

    let dateBtn = getByText(/18/ || /21/)

    fireEvent.click(dateBtn);

    expect(sendFunctionProps).toHaveBeenCalled();
});

test('should change className when clicked', () => {
    let sendFunctionProps = jest.fn();
    const {getByText} = render(<Time sendTime={sendFunctionProps} />);

    const dateBtn = getByText(/21/);

    fireEvent.click(dateBtn);

    expect(dateBtn).toHaveClass('btn-style');

});
