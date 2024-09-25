/* eslint-disable @typescript-eslint/no-explicit-any */
import type WalletStore from '$store/walletStore';

export function updateStoreBooleanField(store: typeof WalletStore, key: string, value: boolean) {
	store.update((state: any) => {
		return { ...state, [key]: value };
	});
}

export function updateStoreStringField(store: typeof WalletStore, key: string, value: string) {
	store.update((state: any) => {
		return { ...state, [key]: value };
	});
}
