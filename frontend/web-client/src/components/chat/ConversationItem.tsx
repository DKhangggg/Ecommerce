import type {Conversation} from "@/types/chat.type.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {motion} from "framer-motion";

interface ConversationItemProps {
    chat: Conversation;
    isSelected: boolean;
    onClick: () => void;
}

export function ConversationItem({chat, isSelected, onClick}: ConversationItemProps) {
    return (
        <motion.button
            initial={{opacity: 0, y: 6}}
            animate={{opacity: 1, y: 0}}
            onClick={onClick}
            className={`w-full flex items-center gap-3 p-3 mb-1 rounded-xl transition-all text-left border ${
                isSelected
                    ? 'bg-[rgba(253,245,230,0.7)] border-[#b97b48]/30 shadow-sm'
                    : 'hover:bg-[rgba(250,238,207,0.4)] border-transparent'
            }`}
        >
            {/* 1. CONTAINER AVATAR (Điều chỉnh kích thước cố định xuống w-6 h-6) */}
            <div className="relative flex-shrink-0 flex justify-start">
                {/* Giảm kích thước Avatar xuống w-6 h-6 */}
                <Avatar className="h-6 w-6 ring-2 ring-white">
                    <AvatarImage src={chat.avatar} alt={chat.name}/>
                    {/* Giảm kích thước chữ Fallback */}
                    <AvatarFallback className="bg-gradient-to-br from-[#b97b48] to-[#a06a3e] text-white text-xs">
                        {chat.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <span
                    className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"/>
            </div>

            {/* 2. CONTAINER NỘI DUNG (Chiếm PHẦN CÒN LẠI) */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                    {/* Tên chat */}
                    <h3 className="font-semibold text-gray-900 text-sm truncate flex-1 min-w-0">{chat.name}</h3>
                    <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2">12:35 PM</span>
                </div>
                <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
            </div>
        </motion.button>
    );
}
