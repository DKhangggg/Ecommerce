import type {Conversation, Message as ChatMessage} from "@/types/chat.type.ts";
import {useEffect, useRef, useState} from "react";
import {MessageItem} from "@/components/chat/MessageItem.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {MoreVertical, Paperclip, Phone, Send, Smile, Video} from "lucide-react";
import {motion} from "framer-motion";

interface ChatWindowProps {
    chat: Conversation;
}

export function ChatWindow({chat}: ChatWindowProps) {
    return (
        <div className="flex-1 rounded-2xl bg-white shadow-md border border-gray-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div
                className="flex-shrink-0 h-16 px-5 flex items-center justify-between bg-white border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={chat.avatar} alt={chat.name}/>
                        <AvatarFallback className="bg-gradient-to-br from-[#b97b48] to-[#a06a3e] text-white text-sm">
                            {chat.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900">{chat.name}</h2>
                        <p className="text-[10px] text-gray-500">Active now</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                    <Button variant="ghost" size="icon"
                            className="hover:bg-[rgba(253,245,230,0.7)] hover:text-[#b97b48]">
                        <Phone size={18}/>
                    </Button>
                    <Button variant="ghost" size="icon"
                            className="hover:bg-[rgba(253,245,230,0.7)] hover:text-[#b97b48]">
                        <Video size={18}/>
                    </Button>
                    <Button variant="ghost" size="icon"
                            className="hover:bg-[rgba(253,245,230,0.7)] hover:text-[#b97b48]">
                        <MoreVertical size={18}/>
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <ChatArea messages={chat.messages}/>

            {/* Input Area */}
            <ChatInput/>
        </div>
    );
}

function ChatArea({messages}: { messages: Array<ChatMessage> }) {
    const chatAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            ref={chatAreaRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
        >
            {messages.map((msg) => (
                <MessageItem key={msg.id} message={msg}/>
            ))}
        </motion.div>
    );
}

function ChatInput() {
    const [text, setText] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);

    const handleSend = () => {
        if (text.trim()) {
            console.log('Sending:', text);
            setText('');
        }
    };

    const emojis = ['😀', '😂', '🥰', '😎', '👍', '🔥', '🙏', '🎉', '❤️', '👏'];

    return (
        <div
            className="relative flex-shrink-0 h-16 border-t border-gray-200 px-4 flex items-center gap-2 bg-white/90 backdrop-blur rounded-b-2xl">
            <div className="relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[rgba(253,245,230,0.7)]"
                    onClick={() => setShowEmoji(!showEmoji)}
                >
                    <Smile size={20} className="text-gray-500"/>
                </Button>
                {showEmoji && (
                    <div
                        className="absolute bottom-12 left-0 z-10 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-2 grid grid-cols-6 gap-2">
                        {emojis.map((e) => (
                            <button
                                key={e}
                                className="text-xl hover:bg-[rgba(253,245,230,0.7)] rounded"
                                onClick={() => {
                                    setText(t => t + e);
                                    setShowEmoji(false);
                                }}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-[rgba(253,245,230,0.7)]">
                <Paperclip size={20} className="text-gray-500"/>
            </Button>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 h-10 px-4 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#b97b48]/20 focus:border-[#b97b48] border border-gray-200"
            />
            <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:shadow transition"
                style={{background: '#b97b48'}}
            >
                <Send size={18} className="text-white"/>
            </button>
        </div>
    );
}
