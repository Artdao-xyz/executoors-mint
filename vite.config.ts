import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$store: 'src/store',
			$wallet: 'src/components/wallet',
			$frontend: 'src/components/frontend'
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
