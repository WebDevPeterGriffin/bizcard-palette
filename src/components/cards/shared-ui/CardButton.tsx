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
}

export const CardButton: React.FC<CardButtonProps> = ({
    onClick,
    variant = 'save',
    isDark,
    children,
    className,
    icon,
    disabled = false,
}) => {
    const baseClasses = 'flex items-center gap-2 transition-all duration-300';

    // Define button styles based on variant and theme
    const variantClasses = {
        save: isDark
            ? 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
            : 'border border-current/30 hover:bg-current/10',
        book: isDark
            ? 'bg-white/20 text-white border border-white/40 hover:bg-white/30 backdrop-blur-sm'
            : 'bg-current text-white hover:opacity-90',
    };

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            variant="outline"
            className={cn(baseClasses, variantClasses[variant], className)}
        >
            {icon}
            {children}
        </Button>
    );
};
