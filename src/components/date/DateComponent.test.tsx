import React from 'react';
import { render } from '@testing-library/react';
import DateComponent from './DateComponent';


test('should contain Date component', () => {
    let sendFunctionProps = jest.fn();
    const {container} = render(<DateComponent sendDate={sendFunctionProps} />);
    const dateBtn = container.querySelector('button');
    
    expect(dateBtn).toHaveClass('unclicked');
});

