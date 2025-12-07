import React from "react";
import {
  Globe,
  Instagram,
  Linkedin,
  Github,
  Facebook,
  Youtube,
  Twitch,
  Dribbble,
  Gitlab,
  Slack,
  Pin,
  Ghost,
  Newspaper,
  AtSign,
  Send,
  MessageCircle,
} from "lucide-react";

export const normalizePlatform = (platform: string) => {
  const key = platform.toLowerCase().trim();
  if (key === "x") return "twitter";
  if (key === "yt") return "youtube";
  if (key === "fb") return "facebook";
  if (key === "ig") return "instagram";
  return key;
};

export const socialBaseUrls: Record<string, string> = {
  linkedin: "https://linkedin.com/in/",
  twitter: "https://twitter.com/",
  instagram: "https://instagram.com/",
  github: "https://github.com/",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
  twitch: "https://twitch.tv/",
  dribbble: "https://dribbble.com/",
  behance: "https://behance.net/",
  gitlab: "https://gitlab.com/",
  slack: "https://",
  discord: "https://discord.gg/",
  reddit: "https://reddit.com/u/",
  pinterest: "https://pinterest.com/",
  snapchat: "https://snapchat.com/add/",
  medium: "https://medium.com/@",
  tiktok: "https://tiktok.com/@",
  whatsapp: "https://wa.me/",
  telegram: "https://t.me/",
  website: "https://",
};

export const buildSocialUrl = (platform: string, url: string) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const key = normalizePlatform(platform);
  const base = socialBaseUrls[key] || "https://";

  // Strip leading @ for handles
  const handle = url.replace(/^@/, "").trim();

  // Special cases for phone-like links
  if (key === "whatsapp") {
    // Keep only digits for wa.me
    const digits = handle.replace(/\D/g, "");
    return `${base}${digits}`;
  }

  return `${base}${handle}`;
};

interface SocialIconProps {
  platform: string;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, className }) => {
  const key = normalizePlatform(platform);

  switch (key) {
    case "linkedin":
      return <Linkedin className={className || "h-4 w-4"} />;
    case "twitter":
      // Show X glyph for Twitter rebrand
      return <span className={`font-bold ${className || "text-sm"}`}>𝕏</span>;
    case "github":
      return <Github className={className || "h-4 w-4"} />;
    case "instagram":
      return <Instagram className={className || "h-4 w-4"} />;
    case "facebook":
      return <Facebook className={className || "h-4 w-4"} />;
    case "youtube":
      return <Youtube className={className || "h-4 w-4"} />;
    case "twitch":
      return <Twitch className={className || "h-4 w-4"} />;
    case "discord":
      return <MessageCircle className={className || "h-4 w-4"} />;
    case "dribbble":
      return <Dribbble className={className || "h-4 w-4"} />;
    case "behance":
      return <Dribbble className={className || "h-4 w-4"} />; // closest match
    case "gitlab":
      return <Gitlab className={className || "h-4 w-4"} />;
    case "slack":
      return <Slack className={className || "h-4 w-4"} />;
    case "reddit":
      return <Newspaper className={className || "h-4 w-4"} />;
    case "pinterest":
      return <Pin className={className || "h-4 w-4"} />;
    case "snapchat":
      return <Ghost className={className || "h-4 w-4"} />;
    case "medium":
      return <Newspaper className={className || "h-4 w-4"} />;
    case "telegram":
      return <Send className={className || "h-4 w-4"} />;
    case "whatsapp":
      return <MessageCircle className={className || "h-4 w-4"} />;
    case "tiktok":
      return <AtSign className={className || "h-4 w-4"} />; // fallback glyph
    default:
      return <Globe className={className || "h-4 w-4"} />;
  }
};

export default SocialIcon;
