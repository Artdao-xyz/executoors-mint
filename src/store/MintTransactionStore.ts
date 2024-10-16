import { writable } from 'svelte/store';

export enum transactionStatusType {
	idle = 'not started',
	started = 'started',
	pending = 'preparing to execuute', //pending approval
	awaitingConfirmation = 'awaiting confirmation',
	confirmed = 'executioon confirmed',
	failed = 'failed',
	rejected = 'rejected'
}

export type MintTransactionState = {
	status: transactionStatusType;
	initialized: boolean;
};

const initialState: MintTransactionState = {
	status: transactionStatusType.idle,
	initialized: false
};

const MintTransactionStore = writable<MintTransactionState>(initialState);

export default MintTransactionStore;
