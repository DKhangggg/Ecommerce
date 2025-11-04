import type {Conversation} from "@/types/chat.type.ts";
import {ConversationItem} from "@/components/chat/ConversationItem.tsx";
import {MessageSquarePlus} from "lucide-react";
import {Input} from "antd";
import {Button} from "@/components/ui/button";

const {Search} = Input;

interface SidebarProps {
    conversations: Conversation[];
    selectedChatId: string;
    onSelectChat: (chat: Conversation) => void;
}

export function SidebarChat({conversations, selectedChatId, onSelectChat}: SidebarProps) {
    return (
        <div
            className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
            {/* Header with title and new chat button */}
            <div className="px-5 py-4 border-b border-[#8b5a34]" style={{background: '#a06a3e'}}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Messages</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-white/20 text-white"
                        title="New chat"
                    >
                        <MessageSquarePlus size={20}/>
                    </Button>
                </div>
                <Search
                    placeholder="Search conversations..."
                    allowClear
                    className="ant-search-custom"
                />
                <style>{`
                    .ant-search-custom .ant-input {
                        border-radius: 20px !important;
                        background: white !important;
                        border: 1px solid rgba(255,255,255,0.3) !important;
                        padding: 8px 16px !important;
                        font-size: 14px !important;
                    }
                    .ant-search-custom .ant-input:hover {
                        border-color: rgba(255,255,255,0.5) !important;
                    }
                    .ant-search-custom .ant-input:focus {
                        border-color: white !important;
                        box-shadow: 0 0 0 2px rgba(255,255,255,0.2) !important;
                    }
                    .ant-search-custom .ant-input-search-button {
                        border-radius: 0 20px 20px 0 !important;
                        background: rgba(255,255,255,0.2) !important;
                        border: 1px solid rgba(255,255,255,0.3) !important;
                        color: white !important;
                    }
                    .ant-search-custom .ant-input-search-button:hover {
                        background: rgba(255,255,255,0.3) !important;
                        border-color: rgba(255,255,255,0.5) !important;
                    }
                `}</style>
            </div>

            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto p-2">
                {conversations.map((chat) => (
                    <ConversationItem
                        key={chat.id}
                        chat={chat}
                        isSelected={chat.id === selectedChatId}
                        onClick={() => onSelectChat(chat)}
                    />
                ))}
            </div>
        </div>
    );
}