import { BOT_URL, AUTH_TOKEN } from '$env/static/private';

export async function POST({ request }) {
	try {
		const body = await request.text(); // Get raw text body

		// console.log('POST request arrived');
		// console.log('Request body:', body);

		const response = await fetch(BOT_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain',
				Authorization: `Bearer ${AUTH_TOKEN}`
			},
			body: body
		});

		if (!response.ok) {
			throw new Error(`API responded with status: ${response.status}`);
		}

		const data = await response.text();
		return new Response(data, {
			headers: { 'Content-Type': 'text/plain' }
		});
	} catch (err) {
		console.error('Error in proxy:', err);
		throw new Error('An error occurred while processing your request');
	}
}
