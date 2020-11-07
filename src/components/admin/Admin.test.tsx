import React from 'react';

import { render } from '@testing-library/react';
import Admin from './Admin';

const bookings = [
	{
		_id: 'blabla',
		date: '19/8',
		time: 18,
		guests: 18,
		message: 'Hejhej',
		customerId: '1234567890',
	},
]

const customers = [
	{
		_id: '1',
		firstName: 'Oscar',
		lastName: 'Mattsson',
		email: 'hello@gmail.com',
		phone: '1234567890',
	},
]

test('Should contain h2s', () => {
	const { container } = render(
		<Admin
			allBookings={bookings}
			allCustomers={customers}
		/>
	);

	let h2element = container.querySelector('h2');
	expect(h2element).toBeInTheDocument();
});

test('should contain string Datum', () => {
	const { getByText } = render(
		<Admin
			allBookings={bookings}
			allCustomers={customers}
		/>
	);

	let dateString = getByText('Datum');
	expect(dateString).toBeInTheDocument;
});
