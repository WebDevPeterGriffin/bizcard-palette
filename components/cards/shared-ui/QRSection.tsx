import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRSectionProps {
    value: string;
    size?: number;
    className?: string;
    qrClassName?: string;
    labelClassName?: string;
    label?: string;
    fgColor?: string;
    bgColor?: string;
}

/**
 * Shared QR code section component
 * Renders a QR code with optional label
 */
export const QRSection: React.FC<QRSectionProps> = ({
    value,
    size = 120,
    className = "mt-6",
    qrClassName = "",
    labelClassName = "text-sm mt-2 opacity-70",
    label = "Scan to save contact",
    fgColor = "#000000",
    bgColor = "#ffffff"
}) => {
    if (!value) return null;

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className={qrClassName}>
                <QRCodeSVG
                    value={value}
                    size={size}
                    level="M"
                    fgColor={fgColor}
                    bgColor={bgColor}
                />
            </div>
            {label && <p className={`text-center ${labelClassName}`}>{label}</p>}
        </div>
    );
};
