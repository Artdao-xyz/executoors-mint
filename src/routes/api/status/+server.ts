import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async () => {
	// console.log('server status ok');

	return json({
		status: 'ok'
	});
};
