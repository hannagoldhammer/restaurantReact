import React, {
	useState,
	FormEvent,
	ChangeEvent,
	useEffect,
	useRef,
} from 'react';

import DateComponent from '../date/DateComponent';
import Time from '../time/Time';
import Guests from '../guests/Guests';
import axios from 'axios';
import IBooking from '../../interface/IBooking';
import ThankYou from '../thankyou/ThankYou';
import IThankYou from '../../interface/IThankYou';

interface IHomeProps {
	allBookings: IBooking[];
}

export default function Home(props: IHomeProps) {
	const [guestsNumber, setGuestsNumber] = useState(0);
	const [guestTime, setGuestTime] = useState(0);
	const [guestDate, setGuestDate] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');

	const [tables, setTables] = useState(true);
	const [showTables, setShowTables] = useState(Boolean);
	const [validation, setValidation] = useState(false);

	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [phoneError, setPhoneError] = useState('');
	const [bookingSent, setBookingSent] = useState(false);

	const [gdpr, setGdpr] = useState(false);
	const [gdprClass, setGdprClass] = useState('');

	let thankYouDefaultValue: IThankYou = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		date: '',
		time: 0,
		guests: 0,
		message: '',
	};

	const [theBookedCustomer, setTheBookedCustomer] = useState<IThankYou>(
		thankYouDefaultValue
	);

	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
	}, [firstName, lastName, email, phone]);

	useEffect(() => {
		if (guestTime === 0 || guestsNumber === 0 || guestDate === '') {
			return;
		} else {
			setValidation(true);
		}
	}, [guestTime, guestsNumber, guestDate]);

	function updateGuestsNumber(number: number) {
		setGuestsNumber(number);
	}

	function sendTimeFunction(time: number) {
		setGuestTime(time);
	}

	function sendDateFunction(date: string) {
		setGuestDate(date);
	}

	function updateFirstName(e: ChangeEvent<HTMLInputElement>) {
		setFirstName(e.target.value);
	}

	function updateLastName(e: ChangeEvent<HTMLInputElement>) {
		setLastName(e.target.value);
	}

	function updateEmail(e: ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function updatePhone(e: ChangeEvent<HTMLInputElement>) {
		setPhone(e.target.value);
	}

	function updateMessage(e: ChangeEvent<HTMLTextAreaElement>) {
		setMessage(e.target.value);
	}

	function handleGdpr(e: ChangeEvent<HTMLInputElement>) {
		setGdpr(e.target.checked);
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (firstName === '' || firstName === null) {
			setFirstNameError('Vänligen fyll i ditt förnamn.');
		} else {
			setFirstNameError('');
		}

		if (lastName === '' || lastName === null) {
			setLastNameError('Vänligen fyll i ditt efternamn.');
		} else {
			setLastNameError('');
		}

		if (email === '' || email === null) {
			setEmailError('Vänligen fyll i din email.');
		} else {
			setEmailError('');
		}

		if (phone === '' || phone === null) {
			setPhoneError('Vänligen fyll i ditt telefonnummer.');
		} else {
			setPhoneError('');
		}

		if (gdpr) {
			setGdprClass('');
		}

		if (!gdpr) {
			setGdprClass('GDPR-style');
		}

		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			phone === '' ||
			!gdpr
		) {
			return;
		} else {
			axios
				.post('http://localhost:8000/', {
					firstName,
					lastName,
					email,
					phone,
					date: guestDate,
					time: guestTime,
					guests: guestsNumber,
					message,
				})
				.then((response) => {
					console.log(response.data);

					let bookedCustomer: IThankYou = {
						firstName: response.data.user.firstName,
						lastName: response.data.user.lastName,
						email: response.data.user.email,
						phone: response.data.user.phone,
						message: response.data.booking.message,
						date: response.data.booking.date,
						time: response.data.booking.time,
						guests: response.data.booking.guests,
					};

					setBookingSent(true);
					setTheBookedCustomer(bookedCustomer);
				});
		}
	}

	function checkForAvaliableTables() {
		let table: number = 0;

		const totalBookings = props.allBookings.filter((b) => {
			if (b.date === guestDate && b.time === guestTime) {
				return b;
			}
			return null;
		});

		totalBookings.map((b) => {
			let amountOfTables = Math.ceil(b.guests / 6);
			return (table += amountOfTables);
		});

		setTables(false);

		table < 15 ? setShowTables(true) : setShowTables(false);
	}

	const validatedButton = (
		<button
			type='button'
			className='Btn-search'
			onClick={checkForAvaliableTables}
		>
			Sök efter lediga bord
		</button>
	);

	const unvalidatedButton = (
		<button disabled className='Btn-search-disabled'>
			Sök efter lediga bord
		</button>
	);

	return (
		<div className='header'>
			<h2 className='header-text'>Välkommen till DinnerSpace</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						<span>Välj ett datum</span>
						<DateComponent sendDate={sendDateFunction} />
					</div>
					<div>
						<span>Välj en tid</span>
						<Time sendTime={sendTimeFunction} />
					</div>
					<span>Hur många gäster</span>
					<div className='guestHome'>
						<Guests sendTheNumber={updateGuestsNumber} />
					</div>
					{validation ? validatedButton : unvalidatedButton}
					{tables ? (
						''
					) : showTables ? (
						<div>
							<div className='bookingConfirm'>
								Du vill boka bord den {guestDate} klockan {guestTime}.00 för{' '}
								{guestsNumber === 1
									? guestsNumber + ' person'
									: guestsNumber + ' personer'}
								.
							</div>
							<div className='bookingConfirm'>
								{' '}
								Fyll i dina uppgifter för att genomföra bokningen.
							</div>
							<div className='form-div'>
								<div className='input-wrapping-div'>
									<label>
										<input
											name='firstName'
											onChange={updateFirstName}
											placeholder='Förnamn'
										/>
										{firstNameError && (
											<p className='input-error-message'>{firstNameError}</p>
										)}
									</label>
									<label>
										<input
											name='lastName'
											onChange={updateLastName}
											placeholder='Efternamn'
										/>
										{lastNameError && (
											<p className='input-error-message'>{lastNameError}</p>
										)}
									</label>
								</div>
								<div className='input-wrapping-div'>
									<label>
										<input
											name='email'
											onChange={updateEmail}
											placeholder='Email'
										/>
										{emailError && (
											<p className='input-error-message'>{emailError}</p>
										)}
									</label>
									<label>
										<input
											name='phone'
											onChange={updatePhone}
											placeholder='Telefonnummer'
										/>
										{phoneError && (
											<p className='input-error-message'>{phoneError}</p>
										)}
									</label>
								</div>
								<div className='input-wrapping-div'>
									<label>
										<textarea
											onChange={updateMessage}
											placeholder='Meddelande'
										/>
									</label>
								</div>
								<div className='input-wrapping-div'>
									<div className='GDPR-checkbox'>
										<input
											type='checkbox'
											name='gdprInput'
											onChange={handleGdpr}
										/>{' '}
									</div>
									<span className={gdprClass}>Vi godkänner GDPR.</span>
								</div>
								<div className='input-wrapping-div'>
									<button type='submit' className='btn-post'>
										Boka
									</button>
								</div>
							</div>
						</div>
					) : (
								<p className='error-message'>
									Det är tyvärr slut på bord denna tiden.
						</p>
							)}

					{bookingSent ? <ThankYou theCustomer={theBookedCustomer} /> : ''}
				</div>
			</form>
		</div>
	);
}
