import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';
import Home from './components/home/Home';

import axios from 'axios';
import Admin from './components/admin/Admin';
import IBooking from './interface/IBooking';
import ICustomer from './interface/ICustomer';

function App() {
	let defaultBookingValue: IBooking[] = [];
	let defaultCustomerValue: ICustomer[] = [];
	const [bookings, setBookings] = useState(defaultBookingValue);
	const [customers, setCustomer] = useState(defaultCustomerValue);

	useEffect(() => {
		axios.get('http://localhost:8000/bookings').then((res) => {
			let bookings: IBooking[] = res.data;
			setBookings(bookings);
		});
	}, []);

	useEffect(() => {
		axios.get('http://localhost:8000/customers').then((res) => {
			let allCustomers: ICustomer[] = res.data;
			setCustomer(allCustomers);
		});
	}, []);

	const Page404 = () => (
		<div>
			<p>
				Oj! Något gick fel. Det finns ingen sida med den urlen. Testa att gå
				till vår <Link to='/'>startsida.</Link>
			</p>
		</div>
	);

	return (
		<Router>
			<div>
				<Switch>
					<Route path='/admin'>
						<Admin allBookings={bookings} allCustomers={customers} />
					</Route>
					<Route exact path='/'>
						<Home allBookings={bookings} />
					</Route>
					<Route>
						<Page404 />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
