import type { Account, Fuel } from 'fuels';
import { writable } from 'svelte/store';

export enum WalletType {
	Fuel = 'Fuel Wallet',
	Fuelet = 'Fuelet Wallet',
	Solana = 'Solana Wallets',
	ETHwallet = 'Ethereum Wallets'
}

export type WalletState = {
	isConnected: boolean;
	walletType?: string;
	currentAccount?: string;
	fuel?: Fuel;
	isFuelDetected: boolean;
	isFueletDetected: boolean;
	account?: Account;
};

const initialState: WalletState = {
	isConnected: false,
	isFuelDetected: false,
	isFueletDetected: false
};

const walletStore = writable<WalletState>(initialState);

export default walletStore;
