import React, { useState } from 'react';
import axios from 'axios';

import './Admin.scss';
import IBooking from '../../interface/IBooking';
import ICustomer from '../../interface/ICustomer';
import Calendar from 'react-calendar';
import FormCollector from '../formCollector/FormCollector';
import ITotalBookings from '../../interface/ITotalBookings';

interface IAdminProps {
  allBookings: IBooking[];
  allCustomers: ICustomer[];
}

export default function Admin(props: IAdminProps) {
	let defaultBookingValue: ITotalBookings[] = [
		{
			booking: {
				_id: '',
				date: '',
				time: 0,
				guests: 0,
				message: '',
				customerId: '',
			},
			customer: {
				_id: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
			},
		},
	];

	const [bookings, setBookings] = useState(defaultBookingValue);
	const [showBookings, setShowBookings] = useState(false);

	function updateCalendar(e: Date) {
		let dateString =
			e.toLocaleDateString(undefined, { day: '2-digit' }) +
			' ' +
			e.toLocaleDateString(undefined, { month: 'short' });

		checkForAvaliableTables(dateString);
	}

	function checkForAvaliableTables(dateString: string) {
		const pairedBookings: ITotalBookings[] = props.allBookings.map((b) => {
			if (b.date === dateString) {
				const customer = props.allCustomers.filter((c) => {
					if (b.customerId === c._id) {
						return c;
					}
					return null;
				});

				let summedBooking: ITotalBookings = {
					booking: b,
					customer: customer[0],
				};

				return summedBooking;
			} else {
				const mockBooking: ITotalBookings = {
					booking: {
						_id: '',
						date: '',
						time: 0,
						guests: 0,
						message: '',
						customerId: '',
					},
					customer: {
						_id: '',
						firstName: '',
						lastName: '',
						email: '',
						phone: '',
					},
				};

				return mockBooking;
			}
		});

		const totalBookings: ITotalBookings[] = pairedBookings.filter((b) => {
			if (b.customer._id !== '') {
				return b;
			}
			return null;
		});

		setBookings(totalBookings);
		setShowBookings(true);
	}

	function handleDelete(id: string) {
		axios.delete(`http://localhost:8000/delete/${id}`).then(() => {
			const updatedBookings = bookings.filter((b) => {
				if (b.booking._id !== id) {
					return b;
				}
				return null;
			});

			setBookings(updatedBookings);
		});
	}

	return (
		<div className='header'>
			<h2 className='header-text'>
				Välkommen till{' '}
				<a href='/' className='adminLink'>
					DinnerSpace
				</a>
			</h2>

			<div>
				<Calendar onClickDay={updateCalendar} />
			</div>

			<div>
				<div className='form-container'>
					<h2 className='adminHeading'>Datum</h2>
					<h2 className='adminHeading'>Tid</h2>
					<h2 className='adminHeading'>Antal</h2>
					<h2 className='adminHeading'>Meddelande</h2>
				</div>
				{showBookings
					? bookings.map((m) => {
							return (
								<FormCollector
									data={m}
									key={m.booking._id}
									handleDelete={handleDelete}
								/>
							);
					  })
					: ''}
			</div>
		</div>
	);
}
