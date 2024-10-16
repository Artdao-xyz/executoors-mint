import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const page = Number(url.searchParams.get('page') ?? '1');
	const limit = Number(url.searchParams.get('limit') ?? '10');
	const offset = (page - 1) * limit;

	// console.log('artworks api call: ok');

	const artworks = await prisma.artwork.findMany({
		where: { active: true },
		take: limit,
		skip: offset,
		orderBy: { createdAt: 'desc' }
	});

	const total = artworks.length;

	return json({
		artworks,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit)
		}
	});
};
