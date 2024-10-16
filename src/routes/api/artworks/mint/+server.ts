import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	// console.log('post request arrived');
	try {
		const { editions } = await request.json();  // Change to receive 'editions'

		// console.log('editions:', editions);

		const updatedRecords = await prisma.$transaction(
			editions.map((edition: number) =>
				prisma.artwork.update({
					where: { edition },  // Update to use 'edition' as the unique identifier
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

