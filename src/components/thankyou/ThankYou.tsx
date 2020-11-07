import React from 'react';

import IThankYou from '../../interface/IThankYou';

interface IThankYouProps {
	theCustomer: IThankYou;
}

export default function ThankYou(props: IThankYouProps) {
	return (
		<div>
			<h3>
				Hej {props.theCustomer.firstName + ' ' + props.theCustomer.lastName}!
				Tack för din bokning!
			</h3>
			<p>
				Du är välkommen till Dinnerspace den: {props.theCustomer.date}, klockan:{' '}
				{props.theCustomer.time}.00, för{' '}
				{props.theCustomer.guests === 1
					? props.theCustomer.guests + ' person'
					: props.theCustomer.guests + ' personer'}
				.
			</p>
		</div>
	);
}
