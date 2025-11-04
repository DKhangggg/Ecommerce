import type {Conversation} from "@/types/chat.type.ts";

export const mockConversations: Conversation[] = [
    {
        id: 'chat1',
        name: 'Lê Duy Khang',
        avatar: 'https://placehold.co/100x100/F59E0B/white?text=LK',
        lastMessage: 'Tuyệt vời, cảm ơn bạn nhé!',
        messages: [
            {id: 'm1', text: 'Chào bạn, bạn có thể giúp tôi không?', sender: 'other', timestamp: '10:30 AM'},
            {id: 'm2', text: 'Chào, tôi có thể giúp gì cho bạn?', sender: 'me', timestamp: '10:31 AM'},
            {id: 'm3', text: 'Tôi muốn hỏi về aggregator service.', sender: 'other', timestamp: '10:32 AM'},
            {id: 'm4', text: 'Tuyệt vời, cảm ơn bạn nhé!', sender: 'other', timestamp: '10:35 AM'},
        ],
    },
    {
        id: 'chat2',
        name: 'Nhóm Thiết Kế',
        avatar: 'https://placehold.co/100x100/10B981/white?text=UI',
        lastMessage: 'Đã cập nhật file design mới.',
        messages: [
            {id: 'm5', text: 'Mọi người xem file design mới nhé.', sender: 'other', timestamp: '09:15 AM'},
            {id: 'm6', text: 'Đã cập nhật file design mới.', sender: 'other', timestamp: '09:16 AM'},
        ],
    },
    {
        id: 'chat3',
        name: 'Bot Bán Hàng',
        avatar: 'https://placehold.co/100x100/3B82F6/white?text=BOT',
        lastMessage: 'Đơn hàng của bạn đã được xác nhận.',
        messages: [
            {id: 'm7', text: 'Đơn hàng #12345 của bạn đã được xác nhận.', sender: 'other', timestamp: 'Hôm qua'},
        ],
    },
];