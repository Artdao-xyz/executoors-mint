import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	console.log('post reuquest arrived');
	try {
		const { tokenIds } = await request.json();

		console.log('tokenIds:', tokenIds);

		const updatedRecords = await prisma.$transaction(
			tokenIds.map((tokenId: number) =>
				prisma.artwork.update({
					where: { tokenId: tokenId.toString() },
					data: { active: true }
				})
			)
		);

		return json(updatedRecords);
	} catch (error) {
		console.error('Error updating record:', error);
		return json({ error: 'Failed to update record' }, { status: 500 });
	}
};
