import type {Message} from "@/types/chat.type.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {motion} from "framer-motion";

export function MessageItem({message}: { message: Message }) {
    const isMe = message.sender === 'me';

    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{type: 'spring', stiffness: 300, damping: 24}}
            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`max-w-[72%] ${isMe ? 'order-2' : 'order-1'} flex items-end gap-2`}>
                {!isMe && (
                    <Avatar className="h-7 w-7 flex-shrink-0">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User"/>
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            U
                        </AvatarFallback>
                    </Avatar>
                )}
                <div>
                    <div
                        className={`px-4 py-2 rounded-2xl text-sm shadow ${
                            isMe
                                ? 'text-white'
                                : 'bg-white text-gray-900'
                        }`}
                        style={isMe ? {background: '#b97b48'} : {}}
                    >
                        {message.text}
                    </div>
                    <div className={`mt-1 text-[10px] ${isMe ? 'text-right' : 'text-left'} text-gray-500`}>
                        {message.timestamp}
                        {isMe && <span className="ml-1">· seen</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}