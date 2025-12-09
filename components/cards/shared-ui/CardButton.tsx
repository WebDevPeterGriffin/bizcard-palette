import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CardButtonProps {
    onClick?: () => void;
    variant?: 'save' | 'book';
    isDark: boolean;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    accentColor?: string;
    accentForeground?: string;
}

export const CardButton: React.FC<CardButtonProps> = ({
    onClick,
    variant = 'save',
    isDark,
    children,
    className,
    icon,
    disabled = false,
    accentColor,
    accentForeground,
}) => {
    const baseClasses = 'flex items-center gap-2 transition-all duration-300';

    // For dark backgrounds, use semi-transparent white
    // For light backgrounds, use the card's accent color
    const getVariantStyles = () => {
        if (isDark) {
            return variant === 'save'
                ? 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                : 'bg-white/20 text-white border border-white/40 hover:bg-white/30 backdrop-blur-sm';
        }
        // Light background - use accent colors
        return ''; // Will use inline styles for accent colors
    };

    const variantStyles = getVariantStyles();

    // For light backgrounds, use inline styles with accent colors
    const inlineStyles: React.CSSProperties = !isDark && accentColor ? {
        backgroundColor: variant === 'book' ? accentColor : 'transparent',
        color: variant === 'book' ? (accentForeground || '#ffffff') : accentColor,
        borderColor: accentColor,
        borderWidth: '1px',
        borderStyle: 'solid',
    } : {};

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant="outline"
            className={cn(baseClasses, variantStyles, className)}
            style={inlineStyles}
        >
            {icon}
            {children}
        </Button>
    );
};
