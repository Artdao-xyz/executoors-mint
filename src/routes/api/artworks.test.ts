import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import type { RequestEvent } from '@sveltejs/kit';
import { GET as getHandler } from './artworks/+server';
import { POST as mintPostHandler } from './artworks/mint/+server';

vi.mock('$lib/prisma', () => {
	return {
		default: {
			artwork: {
				findMany: vi.fn(),
				create: vi.fn(),
				update: vi.fn()
			}
		}
	};
});

import prisma from '$lib/prisma';

const mockedPrisma = prisma as unknown as {
	artwork: {
		findMany: ReturnType<typeof vi.fn>;
		create: ReturnType<typeof vi.fn>;
		update: ReturnType<typeof vi.fn>;
	};
};

beforeAll(async () => {});

function createRequestEvent<T extends string>(
	url: string,
	routeId: T,
	options: RequestInit = {}
): RequestEvent<Partial<Record<string, string>>, T> {
	return {
		url: new URL(url, 'http://localhost'),
		params: {},
		request: new Request(url, options),
		locals: {},
		platform: {},
		getClientAddress: () => '127.0.0.1',
		cookies: {
			get: () => undefined,
			getAll: () => [],
			set: () => {},
			delete: () => {},
			serialize: () => ''
		},
		fetch: fetch,
		route: {
			id: routeId
		},
		setHeaders: () => {},
		isDataRequest: false,
		isSubRequest: false
	};
}

describe('GET /api/artworks', () => {
	it('should return a list of artworks', async () => {
		const mockArtworks = [
			{
				id: '1',
				tokenId: '1',
				name: 'Artwork 1',
				description: 'Description 1',
				image: 'image1.jpg'
			},
			{
				id: '2',
				tokenId: '2',
				name: 'Artwork 2',
				description: 'Description 2',
				image: 'image2.jpg'
			}
		];

		mockedPrisma.artwork.findMany.mockResolvedValue(mockArtworks);
		const event = createRequestEvent(
			'http://localhost/api/artworks?page=2&limit=5',
			'/api/artworks'
		);
		const response = await getHandler(event);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.artworks).toEqual(mockArtworks);
		expect(mockedPrisma.artwork.findMany).toHaveBeenCalledTimes(1);

		console.log('data:', data);
	});
});

describe('POST /api/artworks/mint', () => {
	it('should update an artwork as minted', async () => {
		const tokenId = '123';
		const mockUpdatedArtwork = {
			id: '1',
			tokenId,
			name: 'Test Artwork',
			description: 'A test artwork',
			image: 'https://example.com/image.jpg',
			active: true
		};

		mockedPrisma.artwork.update.mockResolvedValue(mockUpdatedArtwork);

		const event = createRequestEvent('http://localhost/api/artworks/mint', '/api/artworks/mint', {
			method: 'POST',
			body: JSON.stringify({ tokenId })
		});
		const response = await mintPostHandler(event);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data).toEqual(mockUpdatedArtwork);
		expect(mockedPrisma.artwork.update).toHaveBeenCalledTimes(1);
		expect(mockedPrisma.artwork.update).toHaveBeenCalledWith({
			where: { tokenId: tokenId.toString() },
			data: { active: true }
		});
	});
});

afterAll(async () => {});
