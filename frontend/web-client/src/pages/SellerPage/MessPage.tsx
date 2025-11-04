import {useState} from 'react';
import {mockConversations} from "@/mocks/conversation.ts";
import {SidebarChat} from "@/components/chat/SidbarChat.tsx";
import type {Conversation} from "@/types/chat.type.ts";
import {ChatWindow} from "@/components/chat/ChatWindow.tsx";
import {ChatInfo} from "@/components/chat/ChatInfo.tsx";


export default function SellerMessPage() {
    const [selectedChat, setSelectedChat] = useState<Conversation>(mockConversations[0]);

    return (
        <div className="flex h-[80vh] w-full overflow-hidden bg-gray-100 rounded-lg border border-gray-200 shadow-sm"
             style={{fontFamily: 'Inter, Poppins, sans-serif'}}>

            {/*Sidebar */}
            <div><SidebarChat
                conversations={mockConversations}
                selectedChatId={selectedChat.id}
                onSelectChat={(chat) => setSelectedChat(chat)}
            /></div>


            {/* Cột 2: Cửa sổ Chat (ChatArea + ChatInput) */}
            <ChatWindow chat={selectedChat}/>

            {/* Cột 3: Thông tin Chat */}
            <ChatInfo chat={selectedChat}/>
        </div>
    );
}
