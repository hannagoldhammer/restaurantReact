import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './FormCollector.scss';
import ITotalBookings from '../../interface/ITotalBookings';

interface IFormCollectorProps {
	data: ITotalBookings;
	handleDelete(id: string): void;
}

export default function FormCollector(props: IFormCollectorProps) {
	const [bookingDate, setBookingDate] = useState(props.data.booking.date);
	const [bookingTime, setBookingTime] = useState(props.data.booking.time);
	const [bookingGuests, setBookingGuests] = useState(props.data.booking.guests);
	const [bookingMessage, setBookingMessage] = useState(
		props.data.booking.message
	);

	function handleDate(e: ChangeEvent<HTMLInputElement>) {
		setBookingDate(e.target.value);
	}

	function handleTime(e: ChangeEvent<HTMLInputElement>) {
		setBookingTime(Number(e.target.value));
	}

	function handleGuests(e: ChangeEvent<HTMLInputElement>) {
		setBookingGuests(Number(e.target.value));
	}

	function handleMessage(e: ChangeEvent<HTMLInputElement>) {
		setBookingMessage(e.target.value);
	}

	function handleUpdate(e: FormEvent) {
		e.preventDefault();

		const newBooking = {
			_id: props.data.booking._id,
			date: bookingDate,
			time: bookingTime,
			guests: bookingGuests,
			message: bookingMessage,
			customerId: props.data.booking.customerId,
		};

		axios
			.put(`http://localhost:8000/update/${props.data.booking._id}`, {
				newBooking,
			})
			.then((response) => {
				console.log(response);
			});
	}

	function sendDelete(id: string) {
		props.handleDelete(id);
	}

	return (
		<form onSubmit={handleUpdate}>
			<p>
				{props.data.customer.firstName + ' ' + props.data.customer.lastName}
			</p>
			<input
				value={bookingDate}
				key={props.data.booking.date}
				onChange={handleDate}
				className='form-input'
			/>

			<input
				value={bookingTime}
				key={props.data.booking.time}
				onChange={handleTime}
				className='form-input'
			/>

			<input
				value={bookingGuests}
				key={props.data.booking.guests}
				onChange={handleGuests}
				className='form-input'
			/>

			<input
				value={bookingMessage}
				key={props.data.booking.message}
				onChange={handleMessage}
				className='form-input'
			/>
			<span>
				<i
					className='fas fa-trash-alt'
					onClick={() => {
						sendDelete(props.data.booking._id);
					}}
				></i>
			</span>
			<button type='submit' className='edit-button'>
				<i className='fas fa-edit fa-lg'></i>
			</button>
		</form>
	);
}
