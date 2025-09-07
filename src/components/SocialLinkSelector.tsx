import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface SocialLinkSelectorProps {
  socialLinks: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

const SOCIAL_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
  { id: 'twitter', name: 'Twitter/X', placeholder: 'twitter.com/username' },
  { id: 'instagram', name: 'Instagram', placeholder: 'instagram.com/username' },
  { id: 'facebook', name: 'Facebook', placeholder: 'facebook.com/username' },
  { id: 'github', name: 'GitHub', placeholder: 'github.com/username' },
  { id: 'youtube', name: 'YouTube', placeholder: 'youtube.com/@username' },
  { id: 'tiktok', name: 'TikTok', placeholder: 'tiktok.com/@username' },
  { id: 'whatsapp', name: 'WhatsApp', placeholder: 'wa.me/1234567890' },
  { id: 'telegram', name: 'Telegram', placeholder: 't.me/username' },
  { id: 'custom', name: 'Custom', placeholder: 'Enter URL' },
];

const SocialLinkSelector = ({ socialLinks, onChange }: SocialLinkSelectorProps) => {
  const [newPlatform, setNewPlatform] = useState('');

  const addSocialLink = () => {
    if (!newPlatform) return;
    
    const platform = SOCIAL_PLATFORMS.find(p => p.id === newPlatform);
    if (!platform) return;

    const newLink: SocialLink = {
      platform: newPlatform,
      url: '',
      label: newPlatform === 'custom' ? '' : platform.name
    };

    onChange([...socialLinks, newLink]);
    setNewPlatform('');
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeSocialLink = (index: number) => {
    const updated = socialLinks.filter((_, i) => i !== index);
    onChange(updated);
  };

  const getAvailablePlatforms = () => {
    const usedPlatforms = socialLinks.map(link => link.platform);
    return SOCIAL_PLATFORMS.filter(platform => 
      platform.id === 'custom' || !usedPlatforms.includes(platform.id)
    );
  };

  return (
    <div className="space-y-4">
      <Label>Social Media Links</Label>
      
      {socialLinks.map((link, index) => {
        const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
        return (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1 space-y-2">
              {link.platform === 'custom' && (
                <Input
                  placeholder="Label (e.g., Portfolio, Blog)"
                  value={link.label || ''}
                  onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                />
              )}
              <Input
                placeholder={platform?.placeholder || 'Enter URL'}
                value={link.url}
                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeSocialLink(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}

      {getAvailablePlatforms().length > 0 && (
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Select value={newPlatform} onValueChange={setNewPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a social platform" />
              </SelectTrigger>
              <SelectContent>
                {getAvailablePlatforms().map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addSocialLink}
            disabled={!newPlatform}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SocialLinkSelector;