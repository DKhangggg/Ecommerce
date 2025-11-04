import type {Conversation} from "@/types/chat.type.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Bell, FileText, Image as ImageIcon, Settings, X} from "lucide-react";
import {Button} from "@/components/ui/button";

interface ChatInfoProps {
    chat: Conversation;
}

export function ChatInfo({chat}: ChatInfoProps) {
    return (
        <div
            className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Contact Info</h3>
                <Button variant="ghost" size="icon" className="hover:bg-[rgba(253,245,230,0.7)]">
                    <X size={18} className="text-gray-500"/>
                </Button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-gray-200">
                    <Avatar className="h-24 w-24 mb-4 ring-4 ring-white shadow-md">
                        <AvatarImage src={chat.avatar} alt={chat.name}/>
                        <AvatarFallback className="bg-gradient-to-br from-[#b97b48] to-[#a06a3e] text-white text-2xl">
                            {chat.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{chat.name}</h2>
                    <p className="text-sm text-gray-600 mb-3">Active now</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button variant="ghost" size="icon" className="hover:bg-[rgba(253,245,230,0.7)] rounded-full">
                            <Bell size={20} className="text-gray-600"/>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-[rgba(253,245,230,0.7)] rounded-full">
                            <Settings size={20} className="text-gray-600"/>
                        </Button>
                    </div>
                </div>

                {/* About Section */}
                <div className="py-4 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">About</h4>
                    <p className="text-sm text-gray-600">Hello! I'm available to chat.</p>
                </div>

                {/* Media & Files Section */}
                <div className="py-4 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Media, Links & Docs</h4>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i}
                                 className="aspect-square bg-gray-200 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"/>
                        ))}
                    </div>
                </div>

                {/* Attachments */}
                <div className="py-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Attachments</h4>
                    <div className="space-y-2">
                        <div
                            className="flex items-center gap-3 p-2.5 bg-[rgba(253,245,230,0.4)] hover:bg-[rgba(250,238,207,0.6)] rounded-lg border border-gray-200 transition-colors cursor-pointer">
                            <div
                                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText size={18} className="text-[#b97b48]"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">design_v1.zip</p>
                                <p className="text-xs text-gray-500">2.4 MB</p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-3 p-2.5 bg-[rgba(253,245,230,0.4)] hover:bg-[rgba(250,238,207,0.6)] rounded-lg border border-gray-200 transition-colors cursor-pointer">
                            <div
                                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                <ImageIcon size={18} className="text-[#b97b48]"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">mockup_final.png</p>
                                <p className="text-xs text-gray-500">1.8 MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
