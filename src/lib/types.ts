export type ConversationRole = 'user' | 'assistant';

export type Message = {
	role: ConversationRole;
	content: string;
};

export type Conversation = {
	id?: string;
	messages: Message[];
};
