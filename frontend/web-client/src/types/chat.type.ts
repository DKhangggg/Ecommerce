export type Message = {
    id: string;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
};

export type Conversation = {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    messages: Message[];
};