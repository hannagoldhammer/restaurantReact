import ICustomer from "./ICustomer";

export default interface IBooking {
	_id: string;
	date: string;
	time: number;
	guests: number;
	message: string;
	customerId: string;
}
