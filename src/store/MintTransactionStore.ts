import { writable } from 'svelte/store';

export enum transactionStatusType {
	idle = 'idle',
	started = 'started',
	pending = 'pending', //pending approval
	awaitingConfirmation = 'awaiting confirmation',
	confirmed = 'confirmed',
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
