import type { Timestamp } from 'firebase/firestore';

export type ConversationRole = 'user' | 'assistant';

export type Message = {
	role: ConversationRole;
	content: string;
};

export type Conversation = {
	id?: string;
	userId?: string;
	created?: Timestamp;
	messages: Message[];
};
