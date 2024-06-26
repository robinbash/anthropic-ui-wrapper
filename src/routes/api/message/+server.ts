import { ATHROPIC_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!ATHROPIC_API_KEY) {
			throw new Error('No Anthropic api key');
		}

		const client = new Anthropic({
			apiKey: ATHROPIC_API_KEY
		});

		const requestData = await request.json();

		if (!requestData) {
			throw new Error('No request data');
		}

		const message = requestData.message;

		const stream = new ReadableStream({
			async start(controller) {
				client.messages
					.stream({
						messages: [{ role: 'user', content: message }],
						model: 'claude-3-5-sonnet-20240620',
						max_tokens: 1024
					})
					.on('text', (text) => {
						controller.enqueue(text);
					})
					.on('end', () => {
						controller.close();
					})
					.on('error', () => {
						controller.close();
					});
			}
		});

		return new Response(stream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive'
			}
		});
	} catch (err) {
		console.error(err);
		return json({ error: 'There was an error processing your request' }, { status: 500 });
	}
};
