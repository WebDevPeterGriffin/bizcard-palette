import React from 'react';

interface ProfileSectionProps {
    headshotUrl?: string;
    name?: string;
    title?: string;
    company?: string;
    className?: string;
    headshotClassName?: string;
    nameClassName?: string;
    titleClassName?: string;
    companyClassName?: string;
}

/**
 * Shared profile section component for displaying headshot and basic info
 * Used across all card styles to eliminate duplication
 */
export const ProfileSection: React.FC<ProfileSectionProps> = ({
    headshotUrl,
    name,
    title,
    company,
    className = "",
    headshotClassName = "w-32 h-32 rounded-full object-cover mb-6",
    nameClassName = "text-3xl font-bold mb-2",
    titleClassName = "text-lg mb-1",
    companyClassName = "text-base opacity-80"
}) => {
    return (
        <div className={className}>
            {headshotUrl && (
                <img
                    src={headshotUrl}
                    alt={name || 'Profile'}
                    className={headshotClassName}
                />
            )}
            {name && <h1 className={nameClassName}>{name}</h1>}
            {title && <p className={titleClassName}>{title}</p>}
            {company && <p className={companyClassName}>{company}</p>}
        </div>
    );
};
