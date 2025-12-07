import { Mail, Phone, Globe, Linkedin, Twitter, Instagram, Facebook, Youtube, Github, MessageCircle, Send, Users, Twitch, Camera, Hash, Bookmark, FileText, Code } from "lucide-react";
import React from "react";

export interface SocialLink {
    platform: string;
    url: string;
    label?: string;
}

export const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'linkedin': return React.createElement(Linkedin, { className: "h-5 w-5" });
        case 'twitter': return React.createElement(Twitter, { className: "h-5 w-5" });
        case 'instagram': return React.createElement(Instagram, { className: "h-5 w-5" });
        case 'facebook': return React.createElement(Facebook, { className: "h-5 w-5" });
        case 'youtube': return React.createElement(Youtube, { className: "h-5 w-5" });
        case 'github': return React.createElement(Github, { className: "h-5 w-5" });
        case 'snapchat': return React.createElement(Camera, { className: "h-5 w-5" });
        case 'whatsapp': return React.createElement(MessageCircle, { className: "h-5 w-5" });
        case 'telegram': return React.createElement(Send, { className: "h-5 w-5" });
        case 'messenger': return React.createElement(MessageCircle, { className: "h-5 w-5" });
        case 'discord': return React.createElement(Users, { className: "h-5 w-5" });
        case 'tiktok': return React.createElement(Hash, { className: "h-5 w-5" });
        case 'twitch': return React.createElement(Twitch, { className: "h-5 w-5" });
        case 'pinterest': return React.createElement(Bookmark, { className: "h-5 w-5" });
        case 'reddit': return React.createElement(MessageCircle, { className: "h-5 w-5" });
        case 'behance': return React.createElement(Globe, { className: "h-5 w-5" });
        case 'dribbble': return React.createElement(Globe, { className: "h-5 w-5" });
        case 'medium': return React.createElement(FileText, { className: "h-5 w-5" });
        case 'dev': return React.createElement(Code, { className: "h-5 w-5" });
        default: return React.createElement(Globe, { className: "h-5 w-5" });
    }
};

export const getSocialUrl = (platform: string, url: string) => {
    const cleanUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    switch (platform.toLowerCase()) {
        case 'twitter': return `https://twitter.com/${cleanUrl.replace('@', '').replace('twitter.com/', '')}`;
        case 'linkedin': return cleanUrl.startsWith('linkedin.com') ? `https://${cleanUrl}` : `https://linkedin.com/in/${cleanUrl}`;
        case 'instagram': return `https://instagram.com/${cleanUrl.replace('@', '').replace('instagram.com/', '')}`;
        case 'facebook': return `https://facebook.com/${cleanUrl.replace('facebook.com/', '')}`;
        case 'youtube': return cleanUrl.startsWith('youtube.com') ? `https://${cleanUrl}` : `https://youtube.com/${cleanUrl}`;
        case 'github': return `https://github.com/${cleanUrl.replace('github.com/', '')}`;
        case 'snapchat': return `https://snapchat.com/add/${cleanUrl.replace('snapchat.com/add/', '')}`;
        case 'whatsapp': return cleanUrl.startsWith('wa.me') ? `https://${cleanUrl}` : `https://wa.me/${cleanUrl}`;
        case 'telegram': return cleanUrl.startsWith('t.me') ? `https://${cleanUrl}` : `https://t.me/${cleanUrl}`;
        case 'messenger': return cleanUrl.startsWith('m.me') ? `https://${cleanUrl}` : `https://m.me/${cleanUrl}`;
        case 'discord': return cleanUrl.startsWith('discord.gg') ? `https://${cleanUrl}` : `https://discord.gg/${cleanUrl}`;
        case 'tiktok': return `https://tiktok.com/@${cleanUrl.replace('@', '').replace('tiktok.com/@', '')}`;
        case 'twitch': return `https://twitch.tv/${cleanUrl.replace('twitch.tv/', '')}`;
        case 'pinterest': return `https://pinterest.com/${cleanUrl.replace('pinterest.com/', '')}`;
        case 'reddit': return `https://reddit.com/user/${cleanUrl.replace('reddit.com/user/', '')}`;
        case 'behance': return `https://behance.net/${cleanUrl.replace('behance.net/', '')}`;
        case 'dribbble': return `https://dribbble.com/${cleanUrl.replace('dribbble.com/', '')}`;
        case 'medium': return `https://medium.com/@${cleanUrl.replace('@', '').replace('medium.com/@', '')}`;
        case 'dev': return `https://dev.to/${cleanUrl.replace('dev.to/', '')}`;
        default: return cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
    }
};
