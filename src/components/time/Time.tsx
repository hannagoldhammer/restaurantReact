import React from 'react';
import './Time.scss';

interface ITimeProps {
	sendTime(time: number): void;
}

export default function Time(props: ITimeProps) {
	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.currentTarget.className = 'btn-style';
		sendToParent(Number(e.currentTarget.value));
	}

	function sendToParent(hour: number) {
		props.sendTime(hour);
	}

	return (
		<div className='timeComponent'>
			<span>
				<button
					value='18'
					onClick={handleClick}
					type='button'
					className='unclicked'
				>
					18:00
				</button>
			</span>
			<span>
				<button value='21' onClick={handleClick} type='button' className='unclicked'>
					21:00
				</button>
			</span>
		</div>
	);
}
