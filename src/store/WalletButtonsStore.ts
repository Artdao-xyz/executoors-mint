import { writable } from 'svelte/store';
export type WalletButton = {
	name: string;
	image?: string;
	available?: boolean;
	install_url?: string;
};

export type WalletButtonState = {
	buttons: WalletButton[];
	initialized: boolean;
};

const initialState: WalletButtonState = {
	buttons: [],
	initialized: false
};

const WalletButtonStore = writable<WalletButtonState>(initialState);

export default WalletButtonStore;
